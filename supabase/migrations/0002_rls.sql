-- ════════════════════════════════════════════════════════════════
-- Row Level Security — the access gate
-- Content (spaces/lessons) is visible only to active subscribers.
-- Admins manage everything. Users see only their own profile/sub.
-- ════════════════════════════════════════════════════════════════

alter table public.profiles      enable row level security;
alter table public.subscriptions enable row level security;
alter table public.spaces        enable row level security;
alter table public.lessons       enable row level security;

-- ── profiles ────────────────────────────────────────────────────
create policy "profiles: read own"
  on public.profiles for select
  using (auth.uid () = id);

create policy "profiles: read all (admin)"
  on public.profiles for select
  using (public.is_admin (auth.uid ()));

create policy "profiles: update own (non-role fields)"
  on public.profiles for update
  using (auth.uid () = id);

-- ── subscriptions ───────────────────────────────────────────────
-- Read-only to the owner; the webhook writes via the service role
-- (which bypasses RLS), so no insert/update policy is needed.
create policy "subscriptions: read own"
  on public.subscriptions for select
  using (auth.uid () = user_id);

-- ── spaces ──────────────────────────────────────────────────────
create policy "spaces: subscribers read published"
  on public.spaces for select
  using (
    is_published
    and (public.has_active_sub (auth.uid ()) or public.is_admin (auth.uid ()))
  );

create policy "spaces: admin read all"
  on public.spaces for select
  using (public.is_admin (auth.uid ()));

create policy "spaces: admin write"
  on public.spaces for all
  using (public.is_admin (auth.uid ()))
  with check (public.is_admin (auth.uid ()));

-- ── lessons ─────────────────────────────────────────────────────
create policy "lessons: subscribers read published"
  on public.lessons for select
  using (
    is_published
    and (public.has_active_sub (auth.uid ()) or public.is_admin (auth.uid ()))
  );

create policy "lessons: admin read all"
  on public.lessons for select
  using (public.is_admin (auth.uid ()));

create policy "lessons: admin write"
  on public.lessons for all
  using (public.is_admin (auth.uid ()))
  with check (public.is_admin (auth.uid ()));
