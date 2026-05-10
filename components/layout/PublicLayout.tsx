import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

      <Footer />
    </>
  );
}
