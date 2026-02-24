import React from "react";
import { auth } from "@/auth";
import AuthButton from "@/components/auth/AuthButton";
import Navbar from "@/components/Navbar";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <>
      <header>
        <Navbar />
        <div className="flex items-center gap-4 px-4">
          {session?.user && (
            <span className="text-sm text-gray-500" title="Server session">
              {session.user.email ?? session.user.name}
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
