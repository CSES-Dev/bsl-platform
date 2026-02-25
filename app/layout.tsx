import "./globals.css";
import SessionProvider from "@/components/providers/SessionProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Big Strategy Labs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
