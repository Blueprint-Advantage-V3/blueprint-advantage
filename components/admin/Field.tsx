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
    <label className="block space-y-1">
      <span className="block text-xs font-bold uppercase tracking-widest text-outline">
        {label}
      </span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue ?? undefined}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-outline-variant/20 bg-surface-container-lowest px-4 py-3 text-sm text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
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
    <label className="block space-y-1">
      <span className="block text-xs font-bold uppercase tracking-widest text-outline">
        {label}
      </span>
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? undefined}
        placeholder={placeholder}
        className="w-full rounded-lg border border-outline-variant/20 bg-surface-container-lowest px-4 py-3 font-mono text-sm text-on-surface outline-none transition-all placeholder:text-outline/40 focus:border-primary focus:ring-1 focus:ring-primary"
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
        className="h-4 w-4 rounded border-outline-variant/30 bg-surface-container-lowest accent-primary"
      />
      <span className="text-xs font-bold uppercase tracking-widest text-outline">
        {label}
      </span>
    </label>
  );
}
