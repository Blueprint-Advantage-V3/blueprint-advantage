# Ascendant Core — implementation spec (Apex Academy / "Inner Sanctum" Stitch design)

This is the contract for restyling Blueprint Advantage to the Stitch design.
**Restyle only — never change logic, routing, props, server actions, data
fetching, demo-mode branches, or the `BRAND` constant.** Keep every `href`,
`<Link>`, server action, `IS_DEMO` branch, and prop exactly as-is. Only change
JSX class names, wrapper markup, icons, and brand-neutral chrome copy.

## Tokens (Tailwind, already configured)
- **Page bg:** `bg-canvas` (#0A0A0B). **Surfaces:** `bg-surface` (#131314),
  `bg-surface-container-low` (#1c1b1c, used for sidebars), `bg-surface-container`
  (#201f20), `-high` (#2a2a2b), `-highest` (#353436), `-lowest` (#0e0e0f, inputs).
- **Text:** `text-on-surface` (#e5e2e3), `text-on-surface-variant` (#ccc3d8),
  `text-outline` (#958da1, muted/labels).
- **Primary (light violet):** `text-primary`/`bg-primary` (#d2bbff) with
  `text-on-primary` (#3f008e). **Primary container (saturated violet):**
  `bg-primary-container` (#7c3aed) + `text-on-primary-container` (#ede0ff).
- **Secondary (sky):** `text-secondary`/`bg-secondary` (#89ceff).
  **Tertiary (amber):** `text-tertiary` (#ffb784).
- **Borders:** hairline `border border-outline-variant/10` (or `/20`). Dividers
  `divide-outline-variant/10`.
- **Spacing tokens:** `w-sidebar_width` (280px), `max-w-content_max_width`
  (800px), `px-gutter` (24px), `gap-stack_sm|md|lg` (8/16/32px).

## Typography
- Headings/labels = Geist (`font-display`, `font-headline-lg`, `font-headline-md`,
  `font-label-md`). Body = Inter (`font-body-lg`, `font-body-md`).
- Sizes pair the family with its size token, e.g.
  `font-display text-display`, `font-headline-md text-headline-md`,
  `font-label-md text-label-md`, `font-body-md text-body-md`.
- Display/hero headlines: tight tracking, `font-black`, often
  `bg-gradient-to-b from-on-surface to-on-surface-variant bg-clip-text text-transparent`.

## Icons — use the `<Icon>` component (Material Symbols)
`import { Icon } from "@/components/ui/Icon"` →
`<Icon name="campaign" />`, `<Icon name="check_circle" fill className="text-primary text-[20px]" />`.
Helpers: `import { spaceIcon, channelIcon } from "@/lib/icons"`.
Common names: home, campaign, school, payments, gavel, psychology, settings,
admin_panel_settings, notifications, account_circle, add, edit, delete, search,
play_arrow, check_circle, arrow_forward, chevron_right, description, download,
graphic_eq, videocam, mic, mic_off, call_end, tag, bolt, military_tech,
local_fire_department, trending_up.
Replace existing emoji UI chrome with Material icons. Space identity may keep its
stored emoji (`space.icon`) OR use `spaceIcon(space.slug)` — prefer the emoji if
the component already shows it, to stay data-driven.

## Component recipes
- **Primary CTA (light):** `bg-primary text-on-primary px-6 py-2 rounded-lg font-label-md font-bold glow-button active:scale-95 transition-all`. Big hero: `px-10 py-5 rounded-xl text-headline-md`.
- **Primary container button:** `bg-primary-container text-on-primary-container py-3 rounded-lg font-label-md font-bold hover:opacity-90 active:scale-95 transition-all`.
- **Ghost button:** `border border-outline-variant/30 text-on-surface hover:bg-white/5 rounded-lg`.
- **Card:** `glass-panel rounded-xl` (or `glass-card rounded-2xl` for hoverable). Featured: add `premium-border` (gradient top edge) or `primary-gradient-border`.
- **Chip / badge:** `px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-label-md`. Status dot: `w-1.5 h-1.5 rounded-full bg-green-500` + label.
- **Glass status chip:** `bg-secondary/10 text-secondary px-2 py-0.5 rounded text-[10px] uppercase tracking-widest font-bold`.
- **Input field:** `bg-surface-container-lowest border border-outline-variant/20 rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all`. Labels: `text-xs font-bold uppercase tracking-widest text-outline`.
- **Sidebar nav item (inactive):** `flex items-center gap-stack_sm px-4 py-2 text-on-surface-variant hover:text-on-surface hover:bg-white/5 rounded-lg transition-colors`. **(active):** `text-primary font-bold border-l-4 border-primary bg-primary/10 sidebar-indicator` (note the left indicator bar — keep `rounded-r-lg` so the left bar stays square).
- **Stat card:** `glass-panel p-stack_md rounded-xl` → tiny uppercase `text-outline` label, big `text-3xl font-headline-md text-primary|secondary|tertiary` value, optional thin gradient progress `h-1 bg-gradient-to-r from-secondary to-primary`.
- **Table:** header row `text-outline text-[11px] uppercase tracking-widest`, body `divide-y divide-outline-variant/10`, rows `hover:bg-white/5`.
- **Lesson "Key" box:** `glass-panel p-6 rounded-2xl my-8 border-l-4 border-l-primary` with a `font-headline-md text-primary` heading.
- **Background atmosphere:** absolute blurred blobs `bg-primary/5 blur-[120px] rounded-full` behind content (subtle).

## Layout patterns
- **Member hub:** keep the existing 3-column structure (ServerRail + ChannelSidebar + main). Sidebars use `bg-surface-container-low border-r border-outline-variant/10`. Channel list active item gets the violet left-bar indicator. UserPanel = bottom of channel sidebar, `bg-primary-container` Manage-Subscription button above the user row.
- **Hub home (`/hub`):** premium-border welcome banner (`Welcome back, <name>.` display heading + status chip), then an announcements feed of `glass-panel` cards, then a 3-up stat row.
- **Lesson detail:** breadcrumb, big `aspect-video rounded-2xl` player, then a 12-col grid: `lg:col-span-8` reading column (`.lesson-content`, Key-box) + `lg:col-span-4` sticky aside ("Up Next" glass card + "Resources" list). Bottom: primary-container "Mark as Complete" + ghost "Take Notes".
- **Admin:** sidebar + sticky top bar (page title + `Admin Only` chip + search). Dashboard = stat cards. Lists become glass-panel tables with status dots and `Add New` primary buttons. Keep all forms wired to their existing server actions.
- **Landing:** fixed blurred header, hero (gradient display headline + light primary CTA + ghost secondary + avatar social proof), bento "Architecting Success" feature grid (glass-cards, one with `primary-gradient-border`), pricing card (`glass-card border-2 border-primary/20` with "Claim Your Seat"), scarcity "Doors closing soon" stats, footer.

Keep it desktop-first, fully responsive (mobile: sidebar collapses, single column).
