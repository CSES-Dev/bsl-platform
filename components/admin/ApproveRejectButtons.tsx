"use client";

import React, { useState } from "react";

interface Application {
  id: string;
  type: string;
  status: string;
  submitterName: string;
  submitterEmail: string;
  payload: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  id: string;
  currentStatus: string;
  onSuccess: (updated: Application) => void;
}

export default function ApproveRejectButtons({ id, currentStatus, onSuccess }: Props) {
  const [actioning, setActioning] = useState<"approved" | "rejected" | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleClick(status: "approved" | "rejected") {
    setActioning(status);
    setError(null);
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const b = await res.json();
        throw new Error(b.error ?? "Failed to update");
      }
      const { data } = await res.json();
      onSuccess(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActioning(null);
    }
  }

  return (
    <div className="space-y-3">
      {error && (
        <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>
      )}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => handleClick("approved")}
          disabled={!!actioning || currentStatus === "approved"}
          className="px-4 py-2 rounded-md text-sm font-medium bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Approve application"
        >
          {actioning === "approved" ? "Approving…" : "Approve"}
        </button>
        <button
          type="button"
          onClick={() => handleClick("rejected")}
          disabled={!!actioning || currentStatus === "rejected"}
          className="px-4 py-2 rounded-md text-sm font-medium bg-red-50 text-red-600 ring-1 ring-red-200 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Reject application"
        >
          {actioning === "rejected" ? "Rejecting…" : "Reject"}
        </button>
      </div>
    </div>
  );
}
