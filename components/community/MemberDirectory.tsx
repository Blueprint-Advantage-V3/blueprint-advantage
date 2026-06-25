"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

type Person = { id: string; name: string; role: string; mentor?: boolean };

const MENTORS: Person[] = [
  { id: "marcus", name: "Marcus Webb", role: "Investor · Finance", mentor: true },
  { id: "lena", name: "Dr. Lena Ortiz", role: "Admissions · University", mentor: true },
  { id: "aisha", name: "Prof. Aisha Bello", role: "Attorney · Law", mentor: true },
  { id: "sam", name: "Sam Reyes", role: "AI builder · Using AI", mentor: true },
];
const MEMBERS: Person[] = [
  { id: "maya", name: "Maya R.", role: "Road to University" },
  { id: "jordan", name: "Jordan T.", role: "Law" },
  { id: "sofia", name: "Sofia K.", role: "Using AI" },
  { id: "priya", name: "Priya N.", role: "Finance" },
  { id: "andre", name: "Andre L.", role: "Finance" },
  { id: "leo", name: "Leo M.", role: "Road to University" },
  { id: "tariq", name: "Tariq H.", role: "Using AI" },
  { id: "bea", name: "Bea L.", role: "Law" },
];

export function MemberDirectory({ currentUser }: { currentUser: string }) {
  const [connections, setConnections] = useState<Record<string, boolean>>({});
  const [dm, setDm] = useState<Person | null>(null);
  const ready = useRef(false);

  useEffect(() => {
    try {
      const r = localStorage.getItem("ba_connections");
      if (r) setConnections(JSON.parse(r));
    } catch {
      /* ignore */
    }
    ready.current = true;
  }, []);
  useEffect(() => {
    if (ready.current) {
      try {
        localStorage.setItem("ba_connections", JSON.stringify(connections));
      } catch {
        /* ignore */
      }
    }
  }, [connections]);

  const connectedCount = Object.values(connections).filter(Boolean).length;

  function Card({ p }: { p: Person }) {
    const connected = !!connections[p.id];
    return (
      <div className="flex flex-col rounded-2xl border border-outline-variant/10 bg-surface p-4">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-primary-container font-display text-sm font-semibold text-on-primary-container">
            {p.name.charAt(0)}
          </span>
          <div className="min-w-0">
            <p className="truncate font-display text-[14px] font-semibold text-on-surface">{p.name}</p>
            <p className="truncate font-sans text-[12px] text-on-surface-variant">{p.role}</p>
          </div>
          {p.mentor && (
            <span className="ml-auto flex-none rounded-md bg-primary/12 px-2 py-0.5 font-sans text-[10px] font-medium text-primary">
              Mentor
            </span>
          )}
        </div>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => setConnections((c) => ({ ...c, [p.id]: !c[p.id] }))}
            className={`flex-1 rounded-lg px-3 py-2 font-sans text-[13px] font-medium transition active:scale-[0.98] ${
              connected
                ? "border border-outline-variant/20 text-on-surface-variant"
                : "bg-primary-container text-on-primary-container"
            }`}
          >
            {connected ? "Connected ✓" : "Connect"}
          </button>
          <button
            type="button"
            onClick={() => setDm(p)}
            aria-label={`Message ${p.name}`}
            className="grid h-9 w-9 flex-none place-items-center rounded-lg border border-outline-variant/15 text-on-surface-variant transition hover:bg-on-surface/[0.05] hover:text-on-surface"
          >
            <Icon name="chat_bubble" className="text-[18px]" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-gutter py-stack_lg">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-[28px] font-semibold tracking-[-0.02em] text-on-surface md:text-[32px]">
            Members
          </h1>
          <p className="mt-2 font-body-lg text-body-lg text-on-surface-variant">
            The people you&apos;re in the room with. Connect with mentors and peers.
          </p>
        </div>
        <span className="hidden flex-none rounded-lg border border-outline-variant/12 bg-surface px-3 py-2 font-sans text-[13px] text-on-surface-variant sm:block">
          <span className="font-semibold text-on-surface">{connectedCount}</span> connections
        </span>
      </header>

      <h2 className="mb-3 mt-9 font-display text-[13px] font-semibold uppercase tracking-widest text-outline">Mentors</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {MENTORS.map((p) => (
          <Card key={p.id} p={p} />
        ))}
      </div>

      <h2 className="mb-3 mt-9 font-display text-[13px] font-semibold uppercase tracking-widest text-outline">Members</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {MEMBERS.map((p) => (
          <Card key={p.id} p={p} />
        ))}
      </div>

      {dm && <DMDrawer person={dm} me={currentUser} onClose={() => setDm(null)} />}
    </div>
  );
}

type DM = { from: "me" | "them"; body: string };

function DMDrawer({ person, me, onClose }: { person: Person; me: string; onClose: () => void }) {
  const KEY = `ba_dm_${person.id}`;
  const [msgs, setMsgs] = useState<DM[]>(() => [
    { from: "them", body: `Hey ${me.split(" ")[0]} 👋 great to connect. What are you working on?` },
  ]);
  const [draft, setDraft] = useState("");
  const ready = useRef(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const r = localStorage.getItem(KEY);
      const parsed = r ? (JSON.parse(r) as DM[]) : null;
      if (parsed && parsed.length) setMsgs(parsed);
    } catch {
      /* ignore */
    }
    ready.current = true;
  }, [KEY]);
  useEffect(() => {
    if (ready.current) {
      try {
        localStorage.setItem(KEY, JSON.stringify(msgs));
      } catch {
        /* ignore */
      }
    }
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [msgs, KEY]);

  function send(e: React.FormEvent) {
    e.preventDefault();
    const body = draft.trim();
    if (!body) return;
    setMsgs((m) => [...m, { from: "me", body }]);
    setDraft("");
  }

  return (
    <div className="fixed inset-0 z-[60] flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-full w-full max-w-sm flex-col border-l border-outline-variant/10 bg-surface-container-low"
      >
        <div className="flex flex-none items-center gap-3 border-b border-outline-variant/10 px-4 py-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-container font-sans text-sm font-semibold text-on-primary-container">
            {person.name.charAt(0)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-[14px] font-semibold text-on-surface">{person.name}</p>
            <p className="truncate font-sans text-[11px] text-on-surface-variant">{person.role}</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="grid h-8 w-8 place-items-center rounded-lg text-on-surface-variant transition hover:bg-on-surface/[0.05] hover:text-on-surface">
            <Icon name="close" className="text-[20px]" />
          </button>
        </div>

        <div ref={scrollRef} className="custom-scrollbar flex-1 space-y-2.5 overflow-y-auto p-4">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
              <span
                className={`max-w-[80%] rounded-2xl px-3.5 py-2 font-sans text-[13px] ${
                  m.from === "me"
                    ? "bg-primary-container text-on-primary-container"
                    : "bg-surface-container-high text-on-surface"
                }`}
              >
                {m.body}
              </span>
            </div>
          ))}
        </div>

        <form onSubmit={send} className="flex-none border-t border-outline-variant/10 p-3">
          <div className="flex items-center gap-2 rounded-xl border border-outline-variant/15 bg-surface-container-lowest px-3 focus-within:border-primary/50">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={`Message ${person.name.split(" ")[0]}…`}
              className="flex-1 bg-transparent py-2.5 font-sans text-sm text-on-surface outline-none placeholder:text-outline"
            />
            <button type="submit" aria-label="Send" className="text-outline transition-colors hover:text-primary">
              <Icon name="send" className="text-[20px]" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
