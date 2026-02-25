import React from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Header Placeholder */}
      <header>
        <h1>Public Header</h1>
      </header>

      <main>{children}</main>

      {/* Footer Placeholder */}
      <footer>
        <h3>Footer placeholder</h3>
      </footer>
    </>
  );
}
