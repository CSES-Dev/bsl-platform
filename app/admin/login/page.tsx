"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

// TODO: confirm stats values and labels
const STATS = [
  { value: "2,418", label: "Startups Onboarded" },
  { value: "$847M", label: "Startups Onboarded" },
  { value: "326", label: "Startups Onboarded" },
];

const INPUT_CLASSES =
  "block w-full rounded-md border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-500/30";

const PINK_BUTTON_CLASSES =
  "w-full rounded-md border border-[#D9A8A8] bg-[#F5C3C399] px-4 py-2.5 text-sm font-medium text-stone-900 transition-colors hover:bg-[#F5C3C3]";

export default function AdminLoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/admin");
    }
  }, [session, router]);

  if (status === "loading" || status === "authenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EBE0E0]">
        <p className="text-sm text-stone-700">Loading…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="relative hidden overflow-hidden bg-[#E8E8E8] p-12 md:flex md:w-1/2 md:flex-col md:justify-between">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#F5C3C3]/60"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-32 h-[24rem] w-[24rem] rounded-full bg-[#F5C3C3]/40"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-12 top-1/3 h-32 w-32 rounded-full bg-[#F5C3C3]/50"
        />

        <div className="relative z-10">
          <Image
            src="/bsl-logo-transparent.png"
            alt="Big Strategy Labs"
            width={480}
            height={320}
            className="h-28 w-auto object-contain"
            priority
          />
        </div>

        <div className="relative z-10 max-w-md space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-700">
            Secure Administrative Access
          </p>
          <h1 className="text-4xl font-bold leading-tight text-stone-900">
            Operate the platform that connects capital with conviction.
          </h1>
          <p className="text-sm leading-relaxed text-stone-700">
            Manage applications, review pipelines, and coordinate the BSL
            ambassador network from a single, audited workspace.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-6">
          {STATS.map((stat) => (
            <div key={stat.value}>
              <p className="text-3xl font-bold text-stone-900">{stat.value}</p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-stone-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </aside>

      <main className="flex w-full flex-1 items-center justify-center bg-[#EBE0E0] px-6 py-12 md:w-1/2">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-left">
            <h2 className="text-3xl font-bold text-stone-900">Admin Sign In</h2>
            <p className="text-sm text-stone-700">
              Sign in with your authorised account. All access is logged and
              audited.
            </p>
          </div>

          {/* TODO: implement email/password login — fields are visual only */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-stone-900"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className={INPUT_CLASSES}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-stone-900"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••••••"
                autoComplete="current-password"
                className={INPUT_CLASSES}
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-stone-800">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-stone-400"
              />
              Keep me signed in on this device
            </label>

            <button
              type="submit"
              disabled
              className={`${PINK_BUTTON_CLASSES} disabled:cursor-not-allowed disabled:border-[#E8B5B5] disabled:bg-white/60 disabled:text-stone-500 disabled:hover:bg-white/60`}
            >
              Continue
            </button>
          </form>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-stone-400/60" />
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">
              or
            </span>
            <div className="h-px flex-1 bg-stone-400/60" />
          </div>

          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/admin" })}
            className={`${PINK_BUTTON_CLASSES} flex items-center justify-center gap-3`}
          >
            <Image src="/google.svg" alt="" width={18} height={18} />
            Continue with Google
          </button>

          <div className="rounded-lg border border-[#F5C3C3] bg-[#F5C3C399] p-4">
            <p className="text-xs leading-relaxed text-stone-700">
              This is a restricted system for authorised personnel only.
              Unauthorised access attempts are logged and may be subject to
              disciplinary or legal action.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
