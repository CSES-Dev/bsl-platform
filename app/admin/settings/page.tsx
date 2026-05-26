"use client";

import { useState } from "react";

export default function AdminSettingsPage() {
  const [role, setRole] = useState("ADMIN");

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <h1 className="mb-8 text-3xl font-semibold">
        Admin Settings
      </h1>

      {/* Profile Section */}
      <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-medium">
          Profile
        </h2>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">
              Name
            </p>
            <div className="rounded-md border p-3">
              Admin User
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Email
            </p>
            <div className="rounded-md border p-3">
              admin@bsl.org
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Role
            </p>
            <div className="rounded-md border p-3">
              ADMIN
            </div>
          </div>
        </div>
      </div>

      {/* Role Management */}
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-medium">
          Role Management
        </h2>

        <div className="overflow-hidden rounded-md border">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">
                  User
                </th>
                <th className="p-3 text-left">
                  Email
                </th>
                <th className="p-3 text-left">
                  Role
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t">
                <td className="p-3">
                  Example User
                </td>

                <td className="p-3">
                  user@bsl.org
                </td>

                <td className="p-3">
                  <select
                    value={role}
                    onChange={(e) =>
                      setRole(e.target.value)
                    }
                    className="rounded border px-3 py-2"
                  >
                    <option>
                      USER
                    </option>

                    <option>
                      ADMIN
                    </option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}