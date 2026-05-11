import React from "react";
import Navbar from "@/components/Navbar";
import AuthButton from "@/components/auth/AuthButton";
import Footer from "@/components/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Navbar />
        <div className="flex items-center gap-4 px-4">
          <AuthButton />
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
  );
}