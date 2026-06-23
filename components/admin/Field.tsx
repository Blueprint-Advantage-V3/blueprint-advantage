/**
 * Small shared form primitives for the admin CRUD forms.
 */

export function TextField({
  label,
  name,
  defaultValue,
  placeholder,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-zinc-300">{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue ?? undefined}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-border bg-canvas px-4 py-2.5 text-zinc-100 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30"
      />
    </label>
  );
}

export function TextArea({
  label,
  name,
  defaultValue,
  rows = 8,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-zinc-300">{label}</span>
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? undefined}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-canvas px-4 py-2.5 font-mono text-sm text-zinc-100 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30"
      />
    </label>
  );
}

export function Toggle({
  label,
  name,
  defaultChecked = true,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2.5">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded border-border bg-canvas accent-brand"
      />
      <span className="text-sm text-zinc-300">{label}</span>
    </label>
  );
}
