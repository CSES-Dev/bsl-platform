"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

type ApplicationStatus = "pending" | "approved" | "rejected";
interface Application {
  id: string;
  type: string;
  status: ApplicationStatus;
  submitterName: string;
  submitterEmail: string;
  createdAt: string;
}

const STATUS_OPTIONS: { label: string; value: string }[] = [
  { label: "All Statuses", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  pending:  "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  approved: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  rejected: "bg-red-50 text-red-600 ring-1 ring-red-200",
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [typeInput, setTypeInput] = useState("");

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      if (typeFilter) params.set("type", typeFilter);

      const res = await fetch(`/api/admin/applications?${params.toString()}`);
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error ?? "Failed to load applications");
      }
      const { data } = await res.json();
      setApplications(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, typeFilter]);

  useEffect(() => {
    const timer = setTimeout(() => setTypeFilter(typeInput), 400);
    return () => clearTimeout(timer);
  }, [typeInput]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Applications</h1>
        <p className="text-sm text-gray-500 mt-1">
          Review and manage submitted applications
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="text"
          value={typeInput}
          onChange={(e) => setTypeInput(e.target.value)}
          placeholder="Filter by type..."
          className="text-sm border border-gray-200 rounded-md px-3 py-2 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-sm border border-gray-200 rounded-md px-3 py-2 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {(statusFilter || typeInput) && (
          <button
            onClick={() => { setStatusFilter(""); setTypeFilter(""); setTypeInput(""); }}
            className="text-sm text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              {["Name", "Email", "Type", "Status", "Submitted"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 bg-gray-100 rounded w-3/4" />
                    </td>
                  ))}
                </tr>
              ))
            ) : applications.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-16 text-center">
                  <p className="text-gray-400 text-sm font-medium">No applications found</p>
                  {(statusFilter || typeFilter) && (
                    <p className="text-gray-400 text-xs mt-1">
                      Try adjusting your filters
                    </p>
                  )}
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm">
                    <Link
                      href={`/admin/applications/${app.id}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {app.submitterName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {app.submitterEmail}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 capitalize">
                    {app.type}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${
                        STATUS_STYLES[app.status] ?? "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(app.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && applications.length > 0 && (
        <p className="text-xs text-gray-400 mt-3">
          Showing {applications.length} application{applications.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
  