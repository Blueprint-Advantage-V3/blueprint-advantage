/**
 * "Who's online" panel for text channels (right column). Presence is seeded
 * in the demo; Wave 4 wires real presence via Supabase Realtime.
 */
const ONLINE: { name: string; role?: string }[] = [
  { name: "Dr. Lena Ortiz", role: "Educator" },
  { name: "Maya R." },
  { name: "Jordan T." },
  { name: "Sofia K." },
];
const OFFLINE: { name: string }[] = [{ name: "Priya N." }, { name: "Andre L." }, { name: "Leo M." }];

export function MemberList({ currentUser }: { currentUser: string }) {
  return (
    <aside className="hidden w-56 flex-none flex-col border-l border-outline-variant/10 bg-surface-container-low/40 lg:flex">
      <div className="custom-scrollbar flex-1 overflow-y-auto p-3">
        <p className="px-2 pb-2 text-[11px] font-bold uppercase tracking-widest text-outline">
          Online · {ONLINE.length + 1}
        </p>
        <Row name={`${currentUser} (you)`} online you />
        {ONLINE.map((m) => (
          <Row key={m.name} name={m.name} role={m.role} online />
        ))}
        <p className="px-2 pb-2 pt-4 text-[11px] font-bold uppercase tracking-widest text-outline">
          Offline · {OFFLINE.length}
        </p>
        {OFFLINE.map((m) => (
          <Row key={m.name} name={m.name} />
        ))}
      </div>
    </aside>
  );
}

function Row({
  name,
  role,
  online,
  you,
}: {
  name: string;
  role?: string;
  online?: boolean;
  you?: boolean;
}) {
  return (
    <div className={`flex items-center gap-2.5 rounded-lg px-2 py-1.5 ${online ? "" : "opacity-50"}`}>
      <span className="relative flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary-container text-xs font-bold text-on-primary-container">
        {name.charAt(0).toUpperCase()}
        <span
          className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface-container-low ${
            online ? "bg-green-500" : "bg-outline"
          }`}
        />
      </span>
      <div className="min-w-0">
        <p className={`truncate text-sm ${you ? "font-bold text-primary" : "text-on-surface"}`}>{name}</p>
        {role && <p className="text-[10px] text-secondary">{role}</p>}
      </div>
    </div>
  );
}
