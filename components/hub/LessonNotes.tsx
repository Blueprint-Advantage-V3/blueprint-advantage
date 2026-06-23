import React from "react";

/**
 * Minimal, dependency-free renderer for the lesson notes. Supports the
 * common markdown-ish shapes authors will actually use: #/##/### headings,
 * - bullet lists, 1. numbered lists, **bold**, and paragraphs. Anything
 * fancier can be swapped for a full markdown lib later without touching
 * the lesson page.
 */
export function LessonNotes({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flushList = (key: string) => {
    if (!list) return;
    const items = list.items.map((it, i) => <li key={i}>{inline(it)}</li>);
    blocks.push(
      list.ordered ? <ol key={key}>{items}</ol> : <ul key={key}>{items}</ul>
    );
    list = null;
  };

  lines.forEach((raw, i) => {
    const line = raw.trimEnd();
    const key = `b${i}`;

    if (/^###\s+/.test(line)) {
      flushList(key + "l");
      blocks.push(<h3 key={key}>{inline(line.replace(/^###\s+/, ""))}</h3>);
    } else if (/^##\s+/.test(line)) {
      flushList(key + "l");
      blocks.push(<h2 key={key}>{inline(line.replace(/^##\s+/, ""))}</h2>);
    } else if (/^#\s+/.test(line)) {
      flushList(key + "l");
      blocks.push(<h1 key={key}>{inline(line.replace(/^#\s+/, ""))}</h1>);
    } else if (/^[-*]\s+/.test(line)) {
      if (!list || list.ordered) {
        flushList(key + "l");
        list = { ordered: false, items: [] };
      }
      list.items.push(line.replace(/^[-*]\s+/, ""));
    } else if (/^\d+\.\s+/.test(line)) {
      if (!list || !list.ordered) {
        flushList(key + "l");
        list = { ordered: true, items: [] };
      }
      list.items.push(line.replace(/^\d+\.\s+/, ""));
    } else if (line.trim() === "") {
      flushList(key + "l");
    } else {
      flushList(key + "l");
      blocks.push(<p key={key}>{inline(line)}</p>);
    }
  });
  flushList("final");

  return <article className="prose-notes">{blocks}</article>;
}

/** Renders **bold** within a line; everything else stays plain text. */
function inline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const m = part.match(/^\*\*([^*]+)\*\*$/);
    return m ? <strong key={i}>{m[1]}</strong> : <React.Fragment key={i}>{part}</React.Fragment>;
  });
}
