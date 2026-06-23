/**
 * Renders an embedded video from a YouTube or Vimeo URL. Accepts the
 * common URL shapes and normalizes them to an embeddable form.
 * MVP scope: embeds only (no custom hosting).
 */
export function VideoEmbed({ url, title }: { url: string; title: string }) {
  const embedUrl = toEmbedUrl(url);

  if (!embedUrl) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-border bg-surface text-sm text-zinc-500">
        Video unavailable
      </div>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl border border-border bg-black">
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}

function toEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace("www.", "");

    // Already an embed URL — use as-is.
    if (u.pathname.includes("/embed/") || host === "player.vimeo.com") {
      return url;
    }

    // YouTube: youtu.be/ID or youtube.com/watch?v=ID
    if (host === "youtu.be") {
      return `https://www.youtube.com/embed${u.pathname}`;
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }

    // Vimeo: vimeo.com/ID
    if (host === "vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean)[0];
      if (id) return `https://player.vimeo.com/video/${id}`;
    }

    return url;
  } catch {
    return null;
  }
}
