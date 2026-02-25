import React from "react";
import Navbar from "@/components/Navbar";
import AuthButton from "@/components/auth/AuthButton";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <Navbar />
        <div className="flex items-center gap-4 px-4">
          <AuthButton />
        </div>
      </header>

      <main>{children}</main>

      <footer>
        <h3>Footer placeholder</h3>
      </footer>
    </>
  );
}