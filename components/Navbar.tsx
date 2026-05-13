"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const inferredPage = React.useMemo(() => {
    const p = (pathname || "/").split("?")[0];
    if (p === "/" || p === "") return "home";
    if (p.startsWith("/about")) return "about";
    if (p.startsWith("/events")) return "events";
    if (p.startsWith("/apply")) return "apply";
    return "home";
  }, [pathname]);

  const links: { id: string; label: string; href: string }[] = [
    { id: "home", label: "HOME", href: "/" },
    { id: "about", label: "ABOUT", href: "/about" },
    { id: "events", label: "EVENTS", href: "/events" },
    { id: "apply", label: "APPLY", href: "/apply" },
  ];

  return (
    <nav className="relative w-full bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-28">
          {/* Logo */}
          <Link href="/" className="flex items-center w-[140px] h-[91px] translate-y-[-3px] ml-6" aria-label="Big Strategy Labs - Home">
            <Image src="/bsl-logo.png" alt="Big Strategy Labs" width={140} height={91} />
          </Link>

          {/* Navigation links */}
          <div className="hidden md:flex items-center gap-24">
            {links.map((l) => {
              const isActive = inferredPage === l.id;
              return (
                <Link
                  key={l.id}
                  href={l.href}
                  className={`relative text-[20px] font-normal text-black hover:opacity-70 transition-opacity ${
                    isActive ? "font-medium" : ""
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {l.label}
                  {isActive && <span className="absolute left-0 top-full mt-2 w-full h-[2px] bg-black" />}
                </Link>
              );
            })}
          </div>

          {/* Mobile */}
          <div className="md:hidden">
            <Link href="/apply" className="text-sm px-3 py-1 border rounded">
              Apply
            </Link>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="w-full border-t border-[#BCBCBC]" />
    </nav>
  );
}
