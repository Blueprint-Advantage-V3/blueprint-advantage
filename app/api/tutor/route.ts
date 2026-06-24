import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * AI Study Buddy endpoint. Each campus gets a tutor with its own persona.
 * Calls an OpenAI-compatible chat API (works with OpenAI, DeepSeek, Together,
 * Groq, etc. — just set OPENAI_BASE_URL + OPENAI_MODEL + OPENAI_API_KEY).
 *
 * With no key configured (e.g. the public demo) it returns a friendly
 * coaching fallback so the feature still works end-to-end; add a key to make
 * it answer anything for real.
 */

type Msg = { role: "user" | "assistant"; content: string };

const CAMPUS_PERSONA: Record<string, { name: string; brief: string }> = {
  sat: {
    name: "your Road to University coach",
    brief:
      "You help ambitious students get into top universities: SAT strategy, essays, and applications. Be tactical and motivating.",
  },
  finance: {
    name: "your Finance coach",
    brief:
      "You teach money, budgeting, investing, and building real wealth in plain English. Be practical, never give individualized financial advice — teach principles.",
  },
  law: {
    name: "your Law coach",
    brief:
      "You explain the law, contracts, rights, and legal reasoning in plain English. You teach concepts; you are not a lawyer and do not give legal advice.",
  },
  ai: {
    name: "your AI coach",
    brief:
      "You teach people to use AI to 10x their output — prompting, automating, and building. Be hands-on and concrete.",
  },
};

function personaFor(campus?: string) {
  return (campus && CAMPUS_PERSONA[campus]) || {
    name: "your Blueprint Advantage study buddy",
    brief: "You help ambitious people learn faster and take action.",
  };
}

function fallbackReply(campus: string | undefined, question: string) {
  const p = personaFor(campus);
  const q = question.trim();
  return [
    `I'm ${p.name} 👋 (running in demo mode — add an AI key to unlock full answers).`,
    q
      ? `Here's how I'd start on "${q.slice(0, 140)}": break it into the smallest first step you can do in the next 10 minutes, then build from there. Watch the related lesson, take one note, and apply it today.`
      : `Ask me anything about this campus and I'll break it down, quiz you, or give you a step-by-step plan.`,
    `Tip: consistency beats intensity. Show up daily and the rank-ups take care of themselves. 💪`,
  ].join("\n\n");
}

// ── Best-effort abuse guard (per warm instance) ──────────────────
// DeepSeek is cheap, but this is a public endpoint. Cap input + rate.
// For production scale, move to a shared store (Upstash/Vercel KV) and
// gate behind auth (Wave 4).
const WINDOW_MS = 5 * 60_000;
const MAX_PER_WINDOW = 20;
const MAX_INPUT_CHARS = 4000;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { reply: "Whoa — slow down a sec ⏳ You've hit the tutor a lot. Try again in a few minutes." },
      { status: 429 }
    );
  }

  let body: { messages?: Msg[]; campus?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const messages = (body.messages ?? [])
    .slice(-12)
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));
  const totalChars = messages.reduce((n, m) => n + m.content.length, 0);
  if (totalChars > MAX_INPUT_CHARS) {
    return NextResponse.json(
      { reply: "That's a lot to chew on at once — try asking one focused question and I'll go deep on it. 🎯" },
      { status: 200 }
    );
  }
  const campus = body.campus;
  const lastUser = [...messages].reverse().find((m) => m.role === "user");

  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return NextResponse.json({
      reply: fallbackReply(campus, lastUser?.content ?? ""),
      demo: true,
    });
  }

  const p = personaFor(campus);
  const baseUrl = process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1";
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  try {
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.6,
        max_tokens: 600,
        messages: [
          {
            role: "system",
            content: `You are ${p.name} inside Blueprint Advantage, a premium members-only learning hub. ${p.brief} Keep answers concise, encouraging, and action-oriented. Use short paragraphs or tight lists. When useful, point the student to "watch the related lesson in this campus."`,
          },
          ...messages,
        ],
      }),
    });

    if (!res.ok) {
      return NextResponse.json({
        reply: fallbackReply(campus, lastUser?.content ?? ""),
        demo: true,
      });
    }

    const data = await res.json();
    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      fallbackReply(campus, lastUser?.content ?? "");
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({
      reply: fallbackReply(campus, lastUser?.content ?? ""),
      demo: true,
    });
  }
}
