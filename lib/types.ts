/**
 * App-level domain types. These mirror the Supabase schema in
 * supabase/migrations. Kept hand-written for clarity; you can later
 * generate them with `supabase gen types typescript`.
 */

export type UserRole = "member" | "admin";

export type SubscriptionStatus =
  | "active"
  | "trialing"
  | "past_due"
  | "canceled"
  | "unpaid"
  | "incomplete"
  | "incomplete_expired"
  | "paused";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  status: SubscriptionStatus | null;
  price_id: string | null;
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
}

export interface Space {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  icon: string | null; // single emoji or short label shown in the sidebar
  position: number;
  is_published: boolean;
  created_at: string;
}

/**
 * community-style channel inside a space. `lessons` channels surface the
 * prerecorded lesson library; `text` is chat; `voice`/`video` are live rooms.
 */
export type ChannelType = "lessons" | "schedule" | "text" | "voice" | "video";

/** A session an educator schedules (live class, office hours, Q&A). */
export interface ScheduleSession {
  id: string;
  space_id: string;
  educator: string;
  title: string;
  type: "live-class" | "office-hours" | "qa" | "workshop";
  day: string; // e.g. "Monday"
  time: string; // e.g. "6:00 PM ET"
}

export interface Channel {
  id: string;
  space_id: string;
  slug: string;
  name: string;
  type: ChannelType;
  position: number;
}

/** A chat message in a text channel (Phase 2 realtime; demo-seeded for now). */
export interface ChannelMessage {
  id: string;
  channel_id: string;
  author_name: string;
  author_initial: string;
  body: string;
  created_at: string;
}

export interface Lesson {
  id: string;
  space_id: string;
  slug: string;
  title: string;
  instructor: string | null; // the professor who recorded this lesson
  video_url: string | null;
  content: string | null; // written notes (markdown-ish plain text for MVP)
  position: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}
