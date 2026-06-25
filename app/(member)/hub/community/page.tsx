import { getMemberContext } from "@/lib/subscription";
import { ChatChannel } from "@/components/hub/ChatChannel";
import { Icon } from "@/components/ui/Icon";
import type { ChannelMessage } from "@/lib/types";

export const metadata = { title: "Community" };

const SEED: ChannelMessage[] = [
  { id: "c1", channel_id: "community", author_name: "Maya R.", author_initial: "M", body: "Just hit a 1480 on my practice test 🔥 the 3-pass strategy is unreal.", created_at: "" },
  { id: "c2", channel_id: "community", author_name: "Marcus Webb", author_initial: "M", body: "Reminder: pay yourself first. Automate it today, thank yourself in a year. 💰", created_at: "" },
  { id: "c3", channel_id: "community", author_name: "Jordan T.", author_initial: "J", body: "Anyone in the AI track want to pair on an automation this week?", created_at: "" },
  { id: "c4", channel_id: "community", author_name: "Sam Reyes", author_initial: "S", body: "Drop your best prompt of the week below 👇 I'll give feedback on a few.", created_at: "" },
];

export default async function CommunityPage() {
  const { profile, user } = await getMemberContext();
  const currentUser = profile?.full_name ?? user?.email?.split("@")[0] ?? "You";

  return (
    <div className="mx-auto flex h-full w-full max-w-3xl flex-col">
      <header className="flex-none border-b border-outline-variant/10 px-gutter py-5">
        <h1 className="flex items-center gap-2 font-serif text-[24px] font-medium tracking-tight text-on-surface">
          <Icon name="forum" className="text-[22px] text-primary" /> Community
        </h1>
        <p className="mt-1 font-sans text-sm text-on-surface-variant">
          One room for every member. Share wins, ask questions, and meet your people.
        </p>
      </header>
      <div className="min-h-0 flex-1">
        <ChatChannel
          channelName="the community"
          initialMessages={SEED}
          currentUser={currentUser}
          storageKey="community"
        />
      </div>
    </div>
  );
}
