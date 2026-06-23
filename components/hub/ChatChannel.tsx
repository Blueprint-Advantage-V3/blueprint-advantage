"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
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
      <div className="flex-1 space-y-4 overflow-y-auto px-gutter py-6">
        {messages.map((m) => (
          <div key={m.id} className="group flex gap-3">
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-primary-container text-sm font-bold text-on-primary-container">
              {m.author_initial}
            </span>
            <div className="min-w-0">
              <p className="font-label-md text-sm font-bold text-on-surface">
                {m.author_name}
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {m.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={send} className="flex-none px-gutter pb-5">
        <div className="flex items-center gap-2 rounded-xl border border-outline-variant/20 bg-surface-container-lowest px-4 transition-all focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={`Message #${channelName}`}
            className="flex-1 bg-transparent py-3 text-sm text-on-surface outline-none placeholder:text-outline"
          />
          <button
            type="submit"
            className="flex h-8 w-8 flex-none items-center justify-center rounded-lg text-outline transition-colors hover:text-primary"
            aria-label="Send message"
          >
            <Icon name="send" />
          </button>
        </div>
      </form>
    </div>
  );
}
