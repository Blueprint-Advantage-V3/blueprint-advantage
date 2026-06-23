import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe/server";
import { createAdminClient } from "@/lib/supabase/server";

/**
 * Stripe webhook — the single source of truth for subscription status.
 * Verifies the signature, then upserts the subscription row keyed by the
 * Supabase user id (carried in metadata / resolved via customer id).
 *
 * Configure the endpoint in Stripe to send at least:
 *   checkout.session.completed
 *   customer.subscription.created
 *   customer.subscription.updated
 *   customer.subscription.deleted
 *
 * Note: this route is excluded from the auth middleware (see middleware.ts).
 */
export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${err instanceof Error ? err.message : "unknown"}` },
      { status: 400 }
    );
  }

  const admin = createAdminClient();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode === "subscription" && session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          );
          await upsertSubscription(admin, subscription, session.metadata?.supabase_user_id);
        }
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await upsertSubscription(admin, subscription);
        break;
      }
      default:
        // Unhandled event types are fine — just acknowledge them.
        break;
    }
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

/**
 * Resolve the Supabase user id and write the subscription row.
 * Tries (in order): explicit metadata → subscription metadata →
 * existing row matched on the Stripe customer id.
 */
async function upsertSubscription(
  admin: ReturnType<typeof createAdminClient>,
  subscription: Stripe.Subscription,
  fallbackUserId?: string
) {
  const customerId = subscription.customer as string;

  let userId =
    fallbackUserId ??
    (subscription.metadata?.supabase_user_id as string | undefined);

  if (!userId) {
    const { data } = await admin
      .from("subscriptions")
      .select("user_id")
      .eq("stripe_customer_id", customerId)
      .maybeSingle();
    userId = data?.user_id;
  }

  if (!userId) {
    console.error("Could not resolve Supabase user for customer", customerId);
    return;
  }

  const priceId = subscription.items.data[0]?.price.id ?? null;
  const periodEnd = subscription.current_period_end
    ? new Date(subscription.current_period_end * 1000).toISOString()
    : null;

  await admin.from("subscriptions").upsert(
    {
      user_id: userId,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscription.id,
      status: subscription.status,
      price_id: priceId,
      current_period_end: periodEnd,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );
}
