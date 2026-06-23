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
          <Link href="/signup" className="font-bold text-primary hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      {searchParams.notice && (
        <p className="mb-4 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 font-body-md text-body-md text-on-surface-variant">
          {searchParams.notice}
        </p>
      )}
      {searchParams.error && (
        <p className="mb-4 rounded-lg border border-error/40 bg-error/10 px-4 py-3 font-body-md text-body-md text-error">
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
          className="glow-button w-full rounded-lg bg-primary-container px-5 py-3 font-label-md font-bold text-on-primary-container transition-all active:scale-95"
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
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-outline">{label}</span>
      <input
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        className="w-full rounded-lg border border-outline-variant/20 bg-surface-container-lowest px-4 py-3 text-sm text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
      />
    </label>
  );
}
