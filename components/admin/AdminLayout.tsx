"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  LayoutGrid,
  FileText,
  Calendar,
  Settings,
} from "lucide-react";

const mainNavItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Applications", href: "/admin/applications", icon: FileText },
  { label: "Events", href: "/admin/events", icon: Calendar },
  { label: "Startup Gallery", href: "/startups", icon: LayoutGrid },
];

const systemNavItems = [
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const userInitial = session?.user?.name?.[0]?.toUpperCase() ?? "?";
  const userName = session?.user?.name ?? "Admin";

  return (
    <div className="h-screen flex">
      <aside className="w-[280px] bg-[#F5F5F5] flex flex-col relative overflow-hidden shrink-0">
        {/* Decorative circle */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[300px] translate-y-1/2 -translate-x-1/4 rounded-full bg-[#FFE5E5] opacity-60" />

        {/* Logo */}
        <div className="relative z-10 px-6 pt-6">
          <Image
            src="/bsl-logo-transparent.png"
            alt="Big Strategy Labs"
            width={160}
            height={50}
            className="h-12 w-auto object-contain object-left"
            priority
          />
        </div>

        {/* Navigation */}
        <div className="relative z-10 mt-2 flex-1 px-4">
          <p className="mb-3 px-2 text-xs font-bold text-gray-700">MAIN</p>

          {/* Decorative red half-circle */}
          <div className="pointer-events-none absolute left-0 top-[40px] h-[200px] w-[60px] overflow-hidden">
            <div className="absolute right-0 top-[50px] h-[120px] w-[120px] rounded-full bg-red-600 opacity-20" />
          </div>

          <nav className="relative flex flex-col gap-0.5">
            {mainNavItems.map(({ label, href, icon: Icon }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    active
                      ? "bg-gray-400 text-black"
                      : "text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8">
            <p className="mb-3 px-2 text-xs font-bold text-gray-700">
              System Preference
            </p>
            <nav className="flex flex-col gap-0.5">
              {systemNavItems.map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  className="flex cursor-not-allowed items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-300"
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {label}
                  <span className="ml-auto rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-400">
                    Soon
                  </span>
                </span>
              ))}
            </nav>
          </div>
        </div>

        {/* User profile */}
        <div className="relative z-10 border-t border-gray-400 p-4">
          <div className="flex items-center gap-3 rounded-lg bg-[#FFE5E5] p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-sm font-bold text-gray-800">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  referrerPolicy="no-referrer"
                  alt={userName}
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              ) : (
                userInitial
              )}
            </div>
            <div className="min-w-0 flex flex-col gap-0.5">
              <p className="truncate text-base font-semibold leading-none text-gray-900">
                {userName}
              </p>
              {session?.user?.role && (
                <span className="text-[11px] font-medium capitalize leading-none text-gray-500">
                  {session.user.role.replace("_", " ")}
                </span>
              )}
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

