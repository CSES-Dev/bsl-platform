"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Settings,
  TrendingUp,
} from "lucide-react";

const mainNavItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Applications", href: "/admin/applications", icon: FileText },
  { label: "Events", href: "/admin/events", icon: Calendar },
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

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r flex flex-col">
        <div className="px-4 pt-5 pb-2">
          <div className="flex items-center gap-1 leading-none">
            <span className="text-base font-bold">Big</span>
            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-base font-bold leading-none">
              Strategy Labs
            </span>
            <span className="h-2 w-2 rounded-full bg-red-500 shrink-0" />
          </div>
        </div>

        <div className="px-3 mt-5 flex-1">
          <p className="px-1 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
            Main
          </p>
          <nav className="flex flex-col gap-0.5">
            {mainNavItems.map(({ label, href, icon: Icon }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="px-3 mb-4">
          <p className="px-1 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
            System Preference
          </p>
          <nav className="flex flex-col gap-0.5">
            {systemNavItems.map(({ label, icon: Icon }) => (
              <span
                key={label}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-300 cursor-not-allowed"
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
                <span className="ml-auto text-[10px] bg-gray-100 text-gray-400 rounded px-1.5 py-0.5">
                  Soon
                </span>
              </span>
            ))}
          </nav>
        </div>

        <div className="border-t px-4 py-3 flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700 shrink-0 overflow-hidden">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                referrerPolicy="no-referrer"
                alt={session.user.name ?? "User"}
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            ) : (
              userInitial
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate leading-tight">
              {session?.user?.name ?? "Admin"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {session?.user?.email ?? ""}
            </p>
            {session?.user?.role && (
              <span className="inline-block mt-0.5 px-1.5 py-0.5 text-[10px] font-medium leading-none rounded bg-blue-100 text-blue-700 capitalize">
                {session.user.role}
              </span>
            )}
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
