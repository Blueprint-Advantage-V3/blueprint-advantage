# Blueprint Advantage

A paid, members-only education hub. Subscribers ($50/mo) log into a
Discord-style hub with a persistent left sidebar of **spaces** (SAT,
Finance, Law, AI, Start Here); clicking a space loads its lessons (video +
written notes) in the main area. Owner-only admin to manage content.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind · Supabase
(auth + Postgres + RLS) · Stripe (subscriptions) · deploy on Vercel.

---

## 1. Local setup

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev                  # http://localhost:3000
```

---

## 2. Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. **Project Settings → API** — copy into `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only; used by the Stripe webhook)
3. **SQL Editor** — run the migrations in order:
   - `supabase/migrations/0001_init.sql` (tables + helpers + triggers)
   - `supabase/migrations/0002_rls.sql` (row-level security policies)
   - `supabase/migrations/0003_phase2_stubs.sql` (inert Phase-2 tables — optional now)
   - `supabase/seed.sql` (optional sample spaces/lessons)
4. **Auth → Providers → Email**: for the smoothest MVP flow, turn **off**
   "Confirm email" (users sign in immediately). Leave it on if you want
   email verification — the `/auth/callback` route already handles it.

### Make yourself the admin

Sign up once through the app, then in the SQL Editor:

```sql
update public.profiles set role = 'admin'
where email = 'you@example.com';
```

You'll now see the **Admin** link in the hub sidebar.

---

## 3. Stripe

1. Create a [Stripe](https://stripe.com) account (use **Test mode** first).
2. **Products → Add product**: name it "Blueprint Advantage Membership",
   add a **recurring** price of **$50 / month**. Copy the **Price ID**
   (`price_…`) → `STRIPE_PRICE_ID`.
3. **Developers → API keys** → copy:
   - `STRIPE_SECRET_KEY` (`sk_test_…`)
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (`pk_test_…`)
4. Enable the **Billing Customer Portal** (Settings → Billing → Customer
   portal) so members can update cards / cancel.

### Webhook

The webhook at `POST /api/stripe/webhook` is the source of truth for
subscription status.

**Local testing** with the Stripe CLI:

```bash
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
# copy the printed whsec_… into STRIPE_WEBHOOK_SECRET
stripe trigger checkout.session.completed   # optional smoke test
```

**Production:** Developers → Webhooks → Add endpoint
`https://YOUR-DOMAIN/api/stripe/webhook`, listening for:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

Copy that endpoint's signing secret into `STRIPE_WEBHOOK_SECRET`.

Use Stripe's test card `4242 4242 4242 4242`, any future expiry / CVC.

---

## 4. Deploy to Vercel

1. Push this repo to GitHub.
2. [vercel.com/new](https://vercel.com/new) → import the repo (Next.js is
   auto-detected).
3. **Environment Variables** — add everything from `.env.example`. Set
   `NEXT_PUBLIC_SITE_URL` to your production URL (e.g.
   `https://blueprintadvantage.com`).
4. Deploy.
5. **Stripe:** create the production webhook (step 3) pointing at the
   deployed `/api/stripe/webhook` and update `STRIPE_WEBHOOK_SECRET` in
   Vercel.
6. **Supabase:** Auth → URL Configuration → add your Vercel domain to the
   redirect allow-list.

---

## How access works

```
visitor → /            (public landing)
        → /signup      (Supabase email/password) → profile auto-created
        → /subscribe   (Stripe Checkout, $50/mo, card required)
        → webhook writes subscriptions.status = 'active'
        → /hub         (gated: active sub required; Discord-style shell)
```

- **Middleware** (`middleware.ts`) refreshes the session and blocks
  unauthenticated access to `/hub` and `/admin`.
- The **(member) layout** enforces an active subscription; non-subscribers
  are redirected to `/subscribe`.
- **RLS** independently guarantees content rows are only readable by active
  subscribers — security doesn't depend on the UI.

---

## Project structure

```
app/
  (marketing)/page.tsx        public landing
  (auth)/login, /signup       Supabase email/password + actions.ts
  auth/callback/route.ts      email-confirm / OAuth code exchange
  subscribe/                  paywall + Stripe Checkout trigger
  (member)/
    layout.tsx                THE HUB SHELL (sidebar + topbar, gated)
    hub/page.tsx              redirect to first space
    hub/[spaceSlug]/          space view = lesson list
    hub/[spaceSlug]/[lessonSlug]/  lesson view (video + notes)
  admin/                      owner-only CRUD (spaces, lessons) + actions.ts
  api/stripe/                 checkout · portal · webhook
components/layout/            Sidebar · TopBar
components/hub/               VideoEmbed
components/admin/             form fields
lib/supabase/                 client · server · middleware helpers
lib/stripe/                   server client
lib/                          constants (BRAND) · types · subscription helpers
supabase/migrations/          schema · RLS · phase-2 stubs
```

## Phase 2 (structured, not built)

Hooks are intentionally left for: per-space realtime chat (`messages`
table + sidebar #channels), lesson comments (`lesson_comments` table +
drop-in region marked in the lesson page), and richer member profiles
(extra `profiles` columns). All stubbed in `0003_phase2_stubs.sql`.
