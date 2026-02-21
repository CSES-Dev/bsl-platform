import React from "react";
import { auth } from "@/auth";
import AuthButton from "@/components/auth/AuthButton";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <>
      <header className="flex items-center justify-between border-b px-4 py-2">
        <h1>Public Header</h1>
        <div className="flex items-center gap-4">
          {session?.user && (
            <span className="text-sm text-gray-500" title="Server session">
              Server: {session.user.email ?? session.user.name}
            </span>
          )}
          <AuthButton />
        </div>
      </header>

      <main>{children}</main>

      <footer>
        <h3>Public Footer</h3>
      </footer>
    </>
  );
}
