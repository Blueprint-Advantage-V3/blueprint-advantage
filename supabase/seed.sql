-- ════════════════════════════════════════════════════════════════
-- Optional seed data — gives the hub real spaces + sample lessons
-- so you can click around immediately. Safe to run once.
-- ════════════════════════════════════════════════════════════════

insert into public.spaces (slug, name, description, icon, position) values
  ('start-here', 'Start Here',  'New here? Read this first.',                    '👋', 0),
  ('sat',        'SAT Prep',    'Crush the SAT with proven strategies.',         '📈', 1),
  ('finance',    'Finance',     'Build wealth and master your money.',           '💰', 2),
  ('law',        'Law',         'Understand the law and protect yourself.',      '⚖️', 3),
  ('ai',         'Using AI',    'Leverage AI to 10x your output.',               '🤖', 4)
on conflict (slug) do nothing;

-- A welcome lesson in Start Here.
insert into public.lessons (space_id, slug, title, video_url, content, position)
select s.id, 'welcome', 'Welcome to Blueprint Advantage',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  E'# Welcome 👋\n\nYou are in. Here is how to get the most out of your membership:\n\n- Pick a space in the sidebar and start the first lesson.\n- New content drops weekly — check Announcements.\n- Take notes. Apply what you learn the same day.\n\nLet''s build your advantage.',
  0
from public.spaces s where s.slug = 'start-here'
on conflict (space_id, slug) do nothing;

insert into public.lessons (space_id, slug, title, video_url, content, position)
select s.id, 'sat-math-foundations', 'SAT Math: The Foundations',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  E'## SAT Math Foundations\n\nIn this lesson we cover the core concepts that show up on every test.\n\n1. Linear equations\n2. Systems\n3. Ratios & percentages\n\nWork the practice set after watching.',
  0
from public.spaces s where s.slug = 'sat'
on conflict (space_id, slug) do nothing;
