"use client";

import React, { useState } from "react";

export default function ApproveRejectButtons({ id }: { id: string | number }) {
  const [loading, setLoading] = useState(false);

  function handleClick(action: "approve" | "reject") {
    console.log(`[BSL-10] ${action} clicked for application ${id}`);
    setLoading(true);
    setTimeout(() => setLoading(false), 700);
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => handleClick("approve")}
        disabled={loading}
        className="inline-flex items-center px-3 py-1.5 bg-emerald-600 text-white text-sm font-medium rounded hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed"
        aria-label="Approve application"
      >
        Approve
      </button>

      <button
        type="button"
        onClick={() => handleClick("reject")}
        disabled={loading}
        className="inline-flex items-center px-3 py-1.5 bg-rose-600 text-white text-sm font-medium rounded hover:bg-rose-700 disabled:opacity-60 disabled:cursor-not-allowed"
        aria-label="Reject application"
      >
        Reject
      </button>
    </div>
  );
}
