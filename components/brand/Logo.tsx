import Link from "next/link";

/**
 * Minimal "b" monogram — used only where a narrow rail can't fit the wordmark
 * (the server rail, the admin nav). Just a clean letter tile, no illustration.
 */
export function LogoMark({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-grid place-items-center rounded-[30%] border border-outline-variant/10 bg-surface-container-high font-display font-bold leading-none text-on-surface ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.5 }}
      aria-hidden="true"
    >
      b
    </span>
  );
}

/**
 * Wordmark — the brand IS the wordmark now. Lowercase, tight, sharp.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display lowercase tracking-tight ${className}`}>
      <span className="text-on-surface">blueprint</span>{" "}
      <span className="text-primary">advantage</span>
    </span>
  );
}

/** The brand lockup — just the wordmark. Pass href={null} to render unlinked. */
export function Logo({
  href = "/",
  wordmarkClass = "text-[19px] font-medium",
  className = "",
}: {
  href?: string | null;
  size?: number;
  wordmarkClass?: string;
  showWordmark?: boolean;
  className?: string;
}) {
  const inner = <Wordmark className={`${wordmarkClass} ${className}`} />;
  return href ? (
    <Link href={href} className="inline-flex items-center" aria-label="Blueprint Advantage">
      {inner}
    </Link>
  ) : (
    inner
  );
}
