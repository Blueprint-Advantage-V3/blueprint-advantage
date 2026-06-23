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

export interface Lesson {
  id: string;
  space_id: string;
  slug: string;
  title: string;
  video_url: string | null;
  content: string | null; // written notes (markdown-ish plain text for MVP)
  position: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}
