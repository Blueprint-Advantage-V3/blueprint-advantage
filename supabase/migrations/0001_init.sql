-- ════════════════════════════════════════════════════════════════
-- Blueprint Advantage — core schema
-- Tables: profiles, subscriptions, spaces, lessons
-- ════════════════════════════════════════════════════════════════

-- ── profiles ────────────────────────────────────────────────────
-- App-level user record, 1:1 with auth.users. role gates the admin UI.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'member' check (role in ('member', 'admin')),
  created_at timestamptz not null default now()
);

-- Auto-create a profile row whenever a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', null)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── subscriptions ───────────────────────────────────────────────
-- Source of truth for hub access. Written by the Stripe webhook.
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid (),
  user_id uuid not null references auth.users (id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text unique,
  status text,
  price_id text,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id)
);

create index if not exists subscriptions_customer_idx
  on public.subscriptions (stripe_customer_id);

-- ── spaces (categories) ─────────────────────────────────────────
create table if not exists public.spaces (
  id uuid primary key default gen_random_uuid (),
  slug text not null unique,
  name text not null,
  description text,
  icon text,                 -- emoji / short label in the sidebar
  position int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ── lessons ─────────────────────────────────────────────────────
create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid (),
  space_id uuid not null references public.spaces (id) on delete cascade,
  slug text not null,
  title text not null,
  video_url text,            -- YouTube / Vimeo embed URL (MVP: embeds only)
  content text,              -- written notes
  position int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (space_id, slug)
);

create index if not exists lessons_space_idx on public.lessons (space_id);

-- Helper: does a given user currently have hub access?
create or replace function public.has_active_sub(uid uuid)
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (
    select 1 from public.subscriptions s
    where s.user_id = uid
      and s.status in ('active', 'trialing')
  );
$$;

-- Helper: is the given user an admin?
create or replace function public.is_admin(uid uuid)
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = uid and p.role = 'admin'
  );
$$;
