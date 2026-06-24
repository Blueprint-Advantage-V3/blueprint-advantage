-- ════════════════════════════════════════════════════════════════
-- Seed content — spaces + lessons (channels auto-create via the 0004
-- trigger, including the Schedule channel). Mirrors the demo content.
-- Run AFTER 0001–0004. Safe to run once.
-- ════════════════════════════════════════════════════════════════

insert into public.spaces (slug, name, description, icon, position) values
  ('sat',     'Road to University', 'Your roadmap into a top university — SAT, essays & applications.', '🎓', 0),
  ('finance', 'Finance',            'Build wealth and master your money.',                              '💰', 1),
  ('law',     'Law',                'Understand the law and protect yourself.',                          '⚖️', 2),
  ('ai',      'Using AI',           'Leverage AI to 10x your output.',                                   '🤖', 3)
on conflict (slug) do nothing;

-- ── Lessons (with instructor) ────────────────────────────────────
insert into public.lessons (space_id, slug, title, instructor, video_url, content, position)
select s.id, v.slug, v.title, v.instructor, v.video_url, v.content, v.position
from public.spaces s
join (values
  ('sat', 'math-foundations', 'SAT Math: The Foundations', 'Dr. Lena Ortiz',
   'https://www.youtube.com/embed/dQw4w9WgXcQ',
   E'## SAT Math Foundations\n\nThe core concepts that show up on every test:\n\n1. Linear equations\n2. Systems of equations\n3. Ratios & percentages\n\nWork the practice set after watching. Aim for 10 problems a day.', 0),
  ('sat', 'reading-strategy', 'SAT Reading: The 3-pass strategy', 'Dr. Lena Ortiz',
   'https://www.youtube.com/embed/aircAruvnKk',
   E'## The 3-pass reading strategy\n\n- **Pass 1:** skim the passage for structure, not detail.\n- **Pass 2:** read the questions, then hunt for evidence.\n- **Pass 3:** eliminate two wrong answers before choosing.', 1),
  ('finance', 'budgeting-101', 'Budgeting 101: Pay yourself first', 'Marcus Webb',
   'https://www.youtube.com/embed/dQw4w9WgXcQ',
   E'## Pay yourself first\n\nBefore you spend a dollar, move a fixed % into savings/investing.\n\n- Start at 10% if you can.\n- Automate it on payday so you never see it.', 0),
  ('finance', 'intro-to-investing', 'Intro to investing', 'Marcus Webb',
   'https://www.youtube.com/embed/aircAruvnKk',
   E'## Intro to investing\n\nLow-cost index funds beat most active strategies.\n\n1. Open a brokerage account.\n2. Buy a broad market index fund.\n3. Contribute every month. Don''t touch it.', 1),
  ('law', 'contracts-basics', 'Contracts: what makes one binding', 'Prof. Aisha Bello',
   'https://www.youtube.com/embed/dQw4w9WgXcQ',
   E'## What makes a contract binding\n\n1. **Offer**\n2. **Acceptance**\n3. **Consideration**\n4. **Intent** to be legally bound\n\nGet it in writing.', 0),
  ('ai', 'prompting-fundamentals', 'Prompting fundamentals', 'Sam Reyes',
   'https://www.youtube.com/embed/aircAruvnKk',
   E'## Prompting fundamentals\n\n- **Context** — who you are, what you''re doing.\n- **Specificity** — exactly what you want back.\n- **Format** — the shape of the answer.', 0),
  ('ai', 'automate-with-ai', 'Automating busywork with AI', 'Sam Reyes',
   'https://www.youtube.com/embed/dQw4w9WgXcQ',
   E'## Automate the busywork\n\n1. Write out the steps you take by hand.\n2. Hand them to an AI as a repeatable prompt.\n3. Save it. Reuse it. Refine it.', 1)
) as v(space_slug, slug, title, instructor, video_url, content, position)
  on s.slug = v.space_slug
on conflict (space_id, slug) do nothing;
