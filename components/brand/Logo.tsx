import Link from "next/link";

/**
 * Blueprint Advantage logomark — a compass/peak that doubles as an "A", drawn
 * on a faint draft grid with a gold node at the summit. "Draft → rise →
 * advantage." Fully ownable; nothing like TRW's generic shield.
 */
export function LogoMark({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        width="54"
        height="54"
        rx="13"
        fill="#18181d"
        stroke="#2c2c33"
        strokeWidth="0.75"
      />
      <g stroke="#33333c" strokeWidth="0.75" opacity="0.7">
        <line x1="14" y1="6" x2="14" y2="50" />
        <line x1="28" y1="6" x2="28" y2="50" />
        <line x1="42" y1="6" x2="42" y2="50" />
        <line x1="6" y1="14" x2="50" y2="14" />
        <line x1="6" y1="28" x2="50" y2="28" />
        <line x1="6" y1="42" x2="50" y2="42" />
      </g>
      <path
        d="M16 42 L28 14 L40 42"
        fill="none"
        stroke="#7aa2ff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="21.5"
        y1="32.5"
        x2="34.5"
        y2="32.5"
        stroke="#7aa2ff"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="28" cy="14" r="3.4" fill="#e0b15e" />
    </svg>
  );
}

/**
 * Lowercase wordmark — modern/premium, the deliberate opposite of TRW's
 * aggressive all-caps. "blueprint" in ink, "advantage" in the blue accent.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display lowercase tracking-tight ${className}`}>
      <span className="text-on-surface">blueprint</span>{" "}
      <span className="text-primary">advantage</span>
    </span>
  );
}

/** Mark + wordmark lockup. Pass href={null} to render without a link. */
export function Logo({
  href = "/",
  size = 32,
  wordmarkClass = "text-[19px] font-medium",
  showWordmark = true,
  className = "",
}: {
  href?: string | null;
  size?: number;
  wordmarkClass?: string;
  showWordmark?: boolean;
  className?: string;
}) {
  const inner = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      {showWordmark && <Wordmark className={wordmarkClass} />}
    </span>
  );
  return href ? (
    <Link href={href} className="inline-flex items-center" aria-label="Blueprint Advantage">
      {inner}
    </Link>
  ) : (
    inner
  );
}
