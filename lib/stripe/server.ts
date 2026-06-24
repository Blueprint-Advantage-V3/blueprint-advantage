import Stripe from "stripe";

/**
 * Server-side Stripe client. Never import into client components.
 *
 * Instantiated lazily via a Proxy so that simply importing this module does
 * NOT require STRIPE_SECRET_KEY at build/render time — the real client is
 * created on first use (inside the API routes, at request time). This keeps
 * the app buildable and deployable with no Stripe env configured (e.g. a
 * demo-mode deploy); the key is only required the moment Stripe is actually
 * called.
 */
let _stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error(
        "STRIPE_SECRET_KEY is not set — configure it to use Stripe."
      );
    }
    _stripe = new Stripe(key, { apiVersion: "2024-06-20", typescript: true });
  }
  return _stripe;
}

export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    const client = getStripe();
    const value = client[prop as keyof Stripe];
    return typeof value === "function"
      ? (value as (...args: unknown[]) => unknown).bind(client)
      : value;
  },
});
