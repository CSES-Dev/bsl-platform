"use client"
import { signOut } from "next-auth/react";

export default function AccessDeniedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-sm space-y-8 p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
        <p className="mt-2 text-sm text-gray-500">
          You don't have permission to view this page.
        </p>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="inline-flex h-10 w-full items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-700"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
