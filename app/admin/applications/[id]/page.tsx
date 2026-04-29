"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ApproveRejectButtons from "@/components/admin/ApproveRejectButtons";

const STATUS_STYLES: Record<string, string> = {
  pending:  "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  approved: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  rejected: "bg-red-50 text-red-600 ring-1 ring-red-200",
};

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

export default function ApplicationDetail() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [app, setApp] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchApp() {
      try {
        const res = await fetch(`/api/admin/applications/${id}`);
        if (res.status === 404) { setError("not_found"); return; }
        if (!res.ok) { const b = await res.json(); throw new Error(b.error ?? "Failed to load"); }
        const { data } = await res.json();
        setApp(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchApp();
  }, [id]);

  if (loading) return <PageShell><LoadingSkeleton /></PageShell>;

  if (error === "not_found") return (
    <PageShell>
      <div className="text-center py-24">
        <p className="text-gray-500 font-medium">Application not found</p>
        <BackLink />
      </div>
    </PageShell>
  );

  if (error) return (
    <PageShell>
      <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>
    </PageShell>
  );

  if (!app) return null;

  return (
    <PageShell>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{app.submitterName}</h1>
          <p className="text-sm text-gray-500 mt-1">{app.submitterEmail}</p>
        </div>
        <BackLink />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Summary</h2>
        </div>
        <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DetailRow label="ID" value={<span className="font-mono text-xs text-gray-500">{app.id}</span>} />
          <DetailRow label="Type" value={<span className="capitalize">{app.type}</span>} />
          <DetailRow label="Status" value={
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${STATUS_STYLES[app.status] ?? "bg-gray-100 text-gray-600"}`}>
              {app.status}
            </span>
          } />
          <DetailRow label="Submitted" value={new Date(app.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} />
          <DetailRow label="Last Updated" value={new Date(app.updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Submission Details</h2>
        </div>
        <div className="px-5 py-4 space-y-4">
          {Object.keys(app.payload).length === 0 ? (
            <p className="text-sm text-gray-400">No payload data.</p>
          ) : (
            Object.entries(app.payload).map(([key, value]) => (
              <div key={key} className="border border-gray-100 rounded-md p-4">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  {key.replace(/_/g, " ")}
                </div>
                <div className="text-sm text-gray-800 whitespace-pre-wrap">
                  {typeof value === "object" ? JSON.stringify(value, null, 2) : String(value ?? "—")}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Actions</h2>
        </div>
        <div className="px-5 py-4">
          <ApproveRejectButtons id={app.id} currentStatus={app.status} onSuccess={setApp} />
        </div>
      </div>
    </PageShell>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="p-6 max-w-3xl mx-auto">{children}</div>;
}

function BackLink() {
  return (
    <Link href="/admin/applications" className="text-sm text-blue-600 hover:underline mt-1 inline-block">
      Back to applications
    </Link>
  );
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 bg-gray-100 rounded w-1/3" />
      <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-100 rounded w-full" />
        ))}
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded w-full" />
        ))}
      </div>
    </div>
  );
}