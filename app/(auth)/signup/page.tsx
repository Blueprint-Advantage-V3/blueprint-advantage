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
          <Link href="/login" className="font-bold text-primary hover:underline">
            Log in
          </Link>
        </>
      }
    >
      {searchParams.error && (
        <p className="mb-4 rounded-lg border border-error/40 bg-error/10 px-4 py-3 font-body-md text-body-md text-error">
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
          className="glow-button w-full rounded-lg bg-primary px-5 py-3 font-label-md font-bold text-on-primary transition-all active:scale-95"
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
