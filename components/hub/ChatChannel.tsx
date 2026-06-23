"use client";

import { useState } from "react";
import type { ChannelMessage } from "@/lib/types";

/**
 * Text channel — message list + composer. Discord-style.
 *
 * MVP: messages are seeded and new messages are appended locally so the
 * channel feels live. Phase 2 swaps the local state for Supabase Realtime
 * (insert into `messages`, subscribe to the channel) — the UI stays the same.
 */
export function ChatChannel({
  channelName,
  initialMessages,
  currentUser,
}: {
  channelName: string;
  initialMessages: ChannelMessage[];
  currentUser: string;
}) {
  const [messages, setMessages] = useState<ChannelMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");

  function send(e: React.FormEvent) {
    e.preventDefault();
    const body = draft.trim();
    if (!body) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `local-${prev.length}`,
        channel_id: "local",
        author_name: currentUser,
        author_initial: currentUser.charAt(0).toUpperCase(),
        body,
        created_at: new Date().toISOString(),
      },
    ]);
    setDraft("");
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-6">
        {messages.map((m) => (
          <div key={m.id} className="flex gap-3">
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
              {m.author_initial}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-zinc-100">
                {m.author_name}
              </p>
              <p className="text-zinc-300">{m.body}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={send} className="flex-none px-5 pb-5">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={`Message #${channelName}`}
          className="w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-zinc-100 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30"
        />
      </form>
    </div>
  );
}
