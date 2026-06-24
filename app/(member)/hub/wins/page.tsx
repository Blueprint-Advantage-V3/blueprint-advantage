import { getMemberContext } from "@/lib/subscription";
import { WinsFeed } from "@/components/community/WinsFeed";

export const metadata = { title: "Wins" };

/** Global Wins feed — community-wide. */
export default async function WinsPage() {
  const { user, profile } = await getMemberContext();
  const currentUser = profile?.full_name ?? user?.email ?? "You";
  return <WinsFeed currentUser={currentUser} />;
}
