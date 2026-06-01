"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ROLES } from "@/lib/rbac";
import type { Role } from "@/lib/rbac";

type User = {
  id: string;
  name: string | null;
  email: string;
  role: Role;
};

const ROLE_OPTIONS = ROLES;

export default function AdminSettingsPage() {
  const { data: session } = useSession();

  const [users, setUsers] = useState<User[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<Record<string, Role>>({});
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [savingUserId, setSavingUserId] = useState<string | null>(null);

  const isSuperAdmin =
  String(session?.user?.role) === "SUPER_ADMIN";
  
  useEffect(() => {
    if (!isSuperAdmin) return;

    async function fetchUsers() {
      setLoadingUsers(true);

      const response = await fetch("/api/admin/users");
      if (!response.ok) {
        setLoadingUsers(false);
        return;
      }
      const data: User[] = await response.json();
      setUsers(data);
      

      const roleMap = data.reduce<Record<string, Role>>((acc, user) => {
        acc[user.id] = user.role;
        return acc;
      }, {});

      setSelectedRoles(roleMap);
      setLoadingUsers(false);
    }

    fetchUsers();
  }, [isSuperAdmin]);

  async function saveRole(userId: string) {
    const role = selectedRoles[userId];
    setSavingUserId(userId);
    try {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      if (response.ok) {
        const updatedUser: User = await response.json();
        setUsers((prev) => prev.map((u) => u.id === updatedUser.id ? updatedUser : u));
        setSelectedRoles((prev) => ({ ...prev, [updatedUser.id]: updatedUser.role }));
      }
    } finally {
      setSavingUserId(null);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <h1 className="mb-8 text-3xl font-semibold">Admin Settings</h1>

      <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-medium">Profile</h2>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <div className="rounded-md border p-3">
              {session?.user?.name ?? "Unknown User"}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <div className="rounded-md border p-3">
              {session?.user?.email ?? "No Email"}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Role</p>
            <div className="rounded-md border p-3">
              {session?.user?.role ?? "No Role"}
            </div>
          </div>
        </div>
      </div>

      {isSuperAdmin && (
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-medium">Role Management</h2>

          <div className="overflow-hidden rounded-md border">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">User</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {loadingUsers ? (
                  <tr>
                    <td className="p-3" colSpan={4}>
                      Loading users...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td className="p-3" colSpan={4}>
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="border-t">
                      <td className="p-3">{user.name ?? "Unnamed User"}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">
                        <select
                          value={selectedRoles[user.id] ?? user.role}
                          onChange={(event) =>
                            setSelectedRoles((prevRoles) => ({
                              ...prevRoles,
                              [user.id]: event.target.value as Role,
                            }))
                          }
                          className="rounded border px-3 py-2"
                        >
                          {ROLE_OPTIONS.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-3">
                        <button
                          type="button"
                          onClick={() => saveRole(user.id)}
                          disabled={
                            savingUserId === user.id ||
                            selectedRoles[user.id] === user.role
                          }
                          className="rounded bg-black px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {savingUserId === user.id ? "Saving..." : "Save"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
