import { MyNotes } from "@/components/hub/MyNotes";

export const metadata = { title: "My notes" };

export default function NotesPage() {
  return (
    <div className="h-full overflow-y-auto">
      <MyNotes />
    </div>
  );
}
