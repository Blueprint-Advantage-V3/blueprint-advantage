import { getMemberContext } from "@/lib/subscription";
import { MemberDirectory } from "@/components/community/MemberDirectory";

export const metadata = { title: "Members" };

export default async function MembersPage() {
  const { profile, user } = await getMemberContext();
  const currentUser = profile?.full_name ?? user?.email?.split("@")[0] ?? "You";
  return (
    <div className="h-full overflow-y-auto">
      <MemberDirectory currentUser={currentUser} />
    </div>
  );
}
