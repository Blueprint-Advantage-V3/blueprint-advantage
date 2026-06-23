-- ════════════════════════════════════════════════════════════════
-- PHASE 2 STUBS — NOT used by the MVP UI.
-- Defined now so the schema is ready for: per-space realtime chat,
-- lesson comments/discussion, and richer member profiles.
-- Apply this migration only when you start building Phase 2, OR apply
-- now (it's inert) so the tables exist for future wiring.
-- ════════════════════════════════════════════════════════════════

-- ── member profile extras (Phase 2: profiles) ───────────────────
alter table public.profiles
  add column if not exists display_name text,
  add column if not exists avatar_url text,
  add column if not exists bio text;

-- ── per-space chat messages (Phase 2: realtime community chat) ──
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid (),
  space_id uuid not null references public.spaces (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);
create index if not exists messages_space_idx on public.messages (space_id, created_at);

-- ── lesson comments (Phase 2: discussion on lessons) ────────────
create table if not exists public.lesson_comments (
  id uuid primary key default gen_random_uuid (),
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);
create index if not exists lesson_comments_lesson_idx
  on public.lesson_comments (lesson_id, created_at);

-- RLS scaffolding (subscribers read/write within spaces they can access).
alter table public.messages        enable row level security;
alter table public.lesson_comments enable row level security;

create policy "messages: subscribers read"
  on public.messages for select
  using (public.has_active_sub (auth.uid ()));
create policy "messages: subscribers write own"
  on public.messages for insert
  with check (auth.uid () = user_id and public.has_active_sub (auth.uid ()));

create policy "lesson_comments: subscribers read"
  on public.lesson_comments for select
  using (public.has_active_sub (auth.uid ()));
create policy "lesson_comments: subscribers write own"
  on public.lesson_comments for insert
  with check (auth.uid () = user_id and public.has_active_sub (auth.uid ()));
