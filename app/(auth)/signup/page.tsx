import Link from "next/link";
import { signUp } from "../actions";
import { AuthShell } from "../shell";

export default function SignupPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Join the hub. You'll add payment on the next step."
      footer={
        <>
          Already a member?{" "}
          <Link href="/login" className="text-brand hover:underline">
            Log in
          </Link>
        </>
      }
    >
      {searchParams.error && (
        <p className="mb-4 rounded-lg border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-300">
          {searchParams.error}
        </p>
      )}
      <form action={signUp} className="space-y-4">
        <Field label="Full name" name="full_name" type="text" autoComplete="name" />
        <Field label="Email" name="email" type="email" autoComplete="email" />
        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
        />
        <button
          type="submit"
          className="w-full rounded-xl bg-brand px-5 py-3 font-semibold text-white transition hover:bg-brand-hover"
        >
          Create account
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
