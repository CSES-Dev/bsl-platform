import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar placeholder */}
      <aside className="w-64 border-r p-4">
        <div className="text-lg font-semibold">BSL Admin</div>
        <div className="mt-4 text-sm text-gray-500">Sidebar placeholder</div>
      </aside>

      {/* Content area */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
