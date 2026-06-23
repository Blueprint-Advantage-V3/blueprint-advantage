import Link from "next/link";
import { signIn } from "../actions";
import { AuthShell } from "../shell";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string; notice?: string; redirect?: string };
}) {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to your hub."
      footer={
        <>
          New here?{" "}
          <Link href="/signup" className="text-brand hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      {searchParams.notice && (
        <p className="mb-4 rounded-lg border border-brand/40 bg-brand-soft px-4 py-3 text-sm text-zinc-200">
          {searchParams.notice}
        </p>
      )}
      {searchParams.error && (
        <p className="mb-4 rounded-lg border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-300">
          {searchParams.error}
        </p>
      )}
      <form action={signIn} className="space-y-4">
        <input type="hidden" name="redirect" value={searchParams.redirect ?? "/hub"} />
        <Field label="Email" name="email" type="email" autoComplete="email" />
        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
        />
        <button
          type="submit"
          className="w-full rounded-xl bg-brand px-5 py-3 font-semibold text-white transition hover:bg-brand-hover"
        >
          Log in
        </button>
      </form>
    </AuthShell>
  );
}

function Field({
  label,
  name,
  type,
  autoComplete,
}: {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-zinc-300">{label}</span>
      <input
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-zinc-100 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30"
      />
    </label>
  );
}
