-- ════════════════════════════════════════════════════════════════
-- Discord-style channels + lesson instructor
-- Each space contains channels of type: lessons | text | voice | video.
-- ════════════════════════════════════════════════════════════════

-- Professor who recorded a lesson.
alter table public.lessons
  add column if not exists instructor text;

-- ── channels ────────────────────────────────────────────────────
create table if not exists public.channels (
  id uuid primary key default gen_random_uuid (),
  space_id uuid not null references public.spaces (id) on delete cascade,
  slug text not null,
  name text not null,
  type text not null default 'text' check (type in ('lessons', 'text', 'voice', 'video')),
  position int not null default 0,
  created_at timestamptz not null default now(),
  unique (space_id, slug)
);
create index if not exists channels_space_idx on public.channels (space_id);

alter table public.channels enable row level security;

create policy "channels: subscribers read"
  on public.channels for select
  using (public.has_active_sub (auth.uid ()) or public.is_admin (auth.uid ()));

create policy "channels: admin write"
  on public.channels for all
  using (public.is_admin (auth.uid ()))
  with check (public.is_admin (auth.uid ()));

-- Seed a default Discord-style channel set for every existing space.
insert into public.channels (space_id, slug, name, type, position)
select s.id, c.slug, c.name, c.type, c.position
from public.spaces s
cross join (values
  ('lessons',      'Lessons',      'lessons', 0),
  ('general',      'general',      'text',    1),
  ('questions',    'questions',    'text',    2),
  ('study-hall',   'Study Hall',   'voice',   3),
  ('office-hours', 'Office Hours', 'voice',   4),
  ('live-class',   'Live Class',   'video',   5)
) as c(slug, name, type, position)
on conflict (space_id, slug) do nothing;

-- Optional: auto-create the default channel set whenever a new space is added.
create or replace function public.seed_default_channels()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.channels (space_id, slug, name, type, position)
  values
    (new.id, 'lessons', 'Lessons', 'lessons', 0),
    (new.id, 'general', 'general', 'text', 1),
    (new.id, 'questions', 'questions', 'text', 2),
    (new.id, 'study-hall', 'Study Hall', 'voice', 3),
    (new.id, 'office-hours', 'Office Hours', 'voice', 4),
    (new.id, 'live-class', 'Live Class', 'video', 5)
  on conflict (space_id, slug) do nothing;
  return new;
end;
$$;

drop trigger if exists on_space_created on public.spaces;
create trigger on_space_created
  after insert on public.spaces
  for each row execute function public.seed_default_channels();
