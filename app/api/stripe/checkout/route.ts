import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Creates a Stripe Checkout Session for the $50/mo subscription and
 * returns its URL. Reuses an existing Stripe customer if we have one.
 */
export async function POST() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  // Look for an existing customer id on the user's subscription row.
  const { data: existing } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .maybeSingle();

  let customerId = existing?.stripe_customer_id ?? undefined;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { supabase_user_id: user.id },
    });
    customerId = customer.id;

    // Persist the customer id immediately (service role bypasses RLS).
    const { createAdminClient } = await import("@/lib/supabase/server");
    const admin = createAdminClient();
    await admin
      .from("subscriptions")
      .upsert(
        { user_id: user.id, stripe_customer_id: customerId },
        { onConflict: "user_id" }
      );
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
    payment_method_collection: "always",
    allow_promotion_codes: true,
    success_url: `${siteUrl}/hub`,
    cancel_url: `${siteUrl}/subscribe?canceled=1`,
    subscription_data: {
      metadata: { supabase_user_id: user.id },
    },
    metadata: { supabase_user_id: user.id },
  });

  return NextResponse.json({ url: session.url });
}
