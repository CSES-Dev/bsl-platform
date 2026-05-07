// Renders outside the admin sidebar — see BSL-51
"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      <div className="flex min-h-screen items-center justify-center bg-stone-100">
        <p className="text-sm uppercase tracking-widest text-stone-500">Loading…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left panel — marketing / branded surface */}
      <aside className="relative hidden overflow-hidden bg-stone-200 p-12 md:flex md:w-1/2 md:flex-col md:justify-between">
        {/* Decorative circles */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full border border-stone-300/60"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full border border-stone-300/60"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-24 left-12 h-40 w-40 rounded-full border border-stone-300/40"
        />

        {/* Top: logo + wordmark */}
        <div className="relative z-10 flex items-center gap-3">
          <Image
            src="/bsl-logo.png"
            alt="Big Strategy Labs"
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
            priority
          />
          <span className="text-lg font-semibold tracking-tight text-stone-900">
            Big Strategy Labs
          </span>
        </div>

        {/* Middle: eyebrow + headline + description */}
        <div className="relative z-10 max-w-md space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
            Secure Administrative Access
          </p>
          <h1 className="text-4xl font-bold leading-tight text-stone-900">
            Operate the platform that connects capital with conviction.
          </h1>
          <p className="text-xs uppercase tracking-wider text-stone-600">
            Manage applications, review pipelines, and coordinate the BSL
            ambassador network from a single, audited workspace.
          </p>
        </div>

        {/* Bottom: stats */}
        {/* TODO: confirm stats with Sharad */}
        <div className="relative z-10 grid grid-cols-3 gap-6">
          <div>
            <p className="text-3xl font-bold text-stone-900">2,418</p>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-stone-500">
              Startups Onboarded
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-stone-900">$847M</p>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-stone-500">
              Startups Onboarded
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-stone-900">326</p>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-stone-500">
              Startups Onboarded
            </p>
          </div>
        </div>
      </aside>

      {/* Right panel — sign-in surface */}
      <main className="flex w-full flex-1 items-center justify-center bg-stone-100 px-6 py-12 md:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-bold text-stone-900">Admin Sign In</h2>
            <p className="text-xs uppercase tracking-wider text-stone-500">
              Use your BSL corporate credentials. All access is logged and
              audited.
            </p>
          </div>

          {/* TODO: email/password login is out of scope — fields are visual only */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs uppercase tracking-wider text-stone-600">
                Work Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@bigstrategylabs.com"
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs uppercase tracking-wider text-stone-600">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <label className="flex items-center gap-2 text-xs text-stone-600">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-stone-300 text-sky-500 focus:ring-sky-400"
              />
              Keep me signed in on this device
            </label>

            <Button type="submit" disabled className="w-full">
              Continue
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-stone-300" />
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              or
            </span>
            <div className="h-px flex-1 bg-stone-300" />
          </div>

          {/* Google SSO — replaces the "Continue with SSO" Figma slot */}
          <Button
            type="button"
            variant="outline"
            onClick={() => signIn("google", { callbackUrl: "/admin" })}
            className="w-full"
          >
            <Image src="/google.svg" alt="" width={20} height={20} />
            Continue with Google
          </Button>

          {/* Restricted-system warning */}
          <div className="rounded-2xl border border-stone-300 bg-stone-50 p-4">
            <p className="text-[11px] leading-relaxed text-stone-600">
              This is a restricted system for authorised BSL personnel only.
              Unauthorised access attempts are logged and may be subject to
              disciplinary or legal action.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
