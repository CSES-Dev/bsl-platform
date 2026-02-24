import React from "react";
import Navbar from "@/components/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>{children}</main>

      <footer>
        <h3>Public Footer</h3>
      </footer>
    </>
  );
}
