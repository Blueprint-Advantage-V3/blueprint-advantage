/**
 * Material Symbols icon. Renders a single ligature glyph from the
 * Material Symbols Outlined font (loaded in globals.css).
 *
 *   <Icon name="campaign" />
 *   <Icon name="check_circle" fill className="text-primary text-[20px]" />
 */
export function Icon({
  name,
  fill = false,
  className = "",
}: {
  name: string;
  fill?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`material-symbols-outlined${fill ? " fill" : ""} ${className}`}
    >
      {name}
    </span>
  );
}
