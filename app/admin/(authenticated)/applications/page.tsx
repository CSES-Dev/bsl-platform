"use client";

import { useCallback, useEffect, useState } from "react";
import { Bell, Building2, File, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import ApproveRejectButtons from "@/components/admin/ApproveRejectButtons";

const TYPE_LABEL: Record<string, string> = {
  startup: "Startup",
  org: "Organization",
  team: "Team",
};

const TYPE_FILTER_OPTIONS = [
  { label: "Startups", value: "startup" },
  { label: "Organizations", value: "org" },
  { label: "Teams", value: "team" },
];

const STATUS_OPTIONS = [
  { label: "All Applications", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

interface ApplicationListItem {
  id: string;
  type: string;
  status: string;
  submitterName: string;
  submitterEmail: string;
  createdAt: string;
}

interface ReviewComment {
  userId: string;
  userName: string;
  userImage: string;
  text: string;
  createdAt: string;
}

interface ApplicationDetail extends ApplicationListItem {
  payload: Record<string, unknown>;
  reviewComments: ReviewComment[];
  updatedAt: string;
}

function timeAgo(date: Date): string {
  const seconds = Math.round((Date.now() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}hr ago`;
  return `${days}d ago`;
}

export default function ApplicationsPage() {
  const { data: session } = useSession();
  const [typeFilter, setTypeFilter] = useState("startup");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [applications, setApplications] = useState<ApplicationListItem[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<ApplicationDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [comments, setComments] = useState<ReviewComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchList = useCallback(async () => {
    setLoadingList(true);
    const params = new URLSearchParams({ type: typeFilter });
    if (statusFilter !== "all") params.set("status", statusFilter);
    try {
      const res = await fetch(`/api/admin/applications?${params}`);
      if (!res.ok) return;
      const { data }: { data: ApplicationListItem[] } = await res.json();
      setApplications(data);
      if (data.length > 0) {
        setSelectedId((prev) =>
          data.find((a) => a.id === prev) ? prev : data[0].id,
        );
      } else {
        setSelectedId(null);
        setDetail(null);
      }
    } finally {
      setLoadingList(false);
    }
  }, [typeFilter, statusFilter]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  useEffect(() => {
    if (!selectedId) {
      setDetail(null);
      return;
    }
    setLoadingDetail(true);
    fetch(`/api/admin/applications/${selectedId}`)
      .then((r) => r.json())
      .then(({ data }) => {
        setDetail(data);
        setComments(data?.reviewComments ?? []);
      })
      .catch(() => setDetail(null))
      .finally(() => setLoadingDetail(false));
  }, [selectedId]);

  function handleStatusUpdate(updated: {
    id: string;
    status: string;
    [key: string]: unknown;
  }) {
    setDetail((prev) =>
      prev ? { ...prev, ...updated, reviewComments: prev.reviewComments } : null,
    );
    setApplications((prev) =>
      prev.map((a) => (a.id === updated.id ? { ...a, status: updated.status } : a)),
    );
  }

  async function handleAddComment() {
    if (!newComment.trim() || !detail || submitting) return;
    setSubmitting(true);
    const prev = [...comments];
    const optimistic: ReviewComment = {
      userId: session?.user?.email ?? "temp",
      userName: session?.user?.name ?? "You",
      userImage: session?.user?.image ?? "",
      text: newComment.trim(),
      createdAt: new Date().toISOString(),
    };
    setComments([...comments, optimistic]);
    setNewComment("");
    try {
      const res = await fetch(
        `/api/admin/applications/${detail.id}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: optimistic.text }),
        },
      );
      if (!res.ok) throw new Error("Failed");
      const updated: ReviewComment[] = await res.json();
      setComments(updated);
    } catch {
      setComments(prev);
      setNewComment(optimistic.text);
    } finally {
      setSubmitting(false);
    }
  }

  const userInitial = session?.user?.name?.[0]?.toUpperCase() ?? "?";

  // Client-side search filter on top of server-fetched list
  const filteredApplications = applications.filter((app) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      app.submitterName.toLowerCase().includes(q) ||
      app.type.toLowerCase().includes(q)
    );
  });

  const payload = detail?.payload;

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Top Bar */}
      <div className="h-20 border-b border-gray-200 flex items-center justify-between px-8 gap-4 shrink-0">
        <h2 className="text-xl font-semibold text-black">BSL Admin</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-2.5 w-[400px]">
            <Search className="size-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search startups, investors..."
              className="flex-1 bg-transparent outline-none text-sm text-gray-600 placeholder:text-gray-400"
            />
          </div>
          {/* Bell is decorative — notifications not yet implemented */}
          <span className="size-10 flex items-center justify-center rounded-lg">
            <Bell className="size-5 text-gray-600" />
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Applications List */}
        <div className="w-[350px] border-r border-gray-200 flex flex-col">
          <div className="p-5 shrink-0">
            <h1 className="text-xl font-bold text-black mb-3">Applications</h1>

            {/* Status Filter */}
            <div className="mb-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs font-medium border border-gray-300 rounded bg-white focus:outline-none focus:border-gray-400"
              >
                {STATUS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter Tabs */}
            <div className="flex gap-1 mb-3 border-b border-gray-200">
              {TYPE_FILTER_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  onClick={() => setTypeFilter(o.value)}
                  className={`px-3 py-2 text-xs font-medium transition-colors border-b-2 ${
                    typeFilter === o.value
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-auto">
            {loadingList ? (
              <div className="p-8 text-center text-gray-500 text-sm">
                Loading…
              </div>
            ) : filteredApplications.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">
                No pending applications found
              </div>
            ) : (
              filteredApplications.map((app) => (
                <button
                  key={app.id}
                  onClick={() => setSelectedId(app.id)}
                  className={`w-full px-5 py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors text-left ${
                    selectedId === app.id ? "bg-gray-100" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="size-9 bg-white border border-gray-300 rounded flex items-center justify-center flex-shrink-0">
                      <Building2 className="size-4 text-gray-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-black">
                        {app.submitterName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {TYPE_LABEL[app.type] ?? app.type} Application
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {timeAgo(new Date(app.createdAt))}
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Application Detail */}
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          {!detail ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                {loadingDetail ? (
                  <p className="text-sm text-gray-400">Loading…</p>
                ) : (
                  <>
                    <p className="text-lg font-medium">No applications found</p>
                    <p className="text-sm">Try adjusting your filters</p>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Header Card */}
              <div className="bg-white rounded-lg border-2 border-gray-300 overflow-hidden">
                <div className="bg-[#F5F5F5] p-4">
                  <div className="flex items-center gap-3">
                    <div className="size-12 bg-white border-2 border-gray-300 rounded flex items-center justify-center flex-shrink-0">
                      <Building2 className="size-6 text-gray-700" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-black mb-2">
                        {detail.submitterName}
                      </h2>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs font-medium rounded">
                          {TYPE_LABEL[detail.type] ?? detail.type} Application
                        </span>
                        <span className="text-xs text-gray-500">
                          {timeAgo(new Date(detail.createdAt))}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      {detail.status === "pending" && (
                        <span className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded uppercase">
                          Pending
                        </span>
                      )}
                      {detail.status === "approved" && (
                        <span className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded uppercase">
                          Approved
                        </span>
                      )}
                      {detail.status === "rejected" && (
                        <span className="px-3 py-1 bg-gray-600 text-white text-xs font-semibold rounded uppercase">
                          Rejected
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="bg-white p-4">
                  <div className="grid grid-cols-4 gap-3 mb-3">
                    {/* Funding Source, Location, Team Size — decorative (no drilldown yet) */}
                    {[
                      { label: "Funding Source", key: "fundingSource" },
                      { label: "Location", key: "location" },
                      { label: "Team Size", key: "teamSize" },
                    ].map(({ label, key }) => (
                      <div
                        key={key}
                        className="text-left hover:bg-gray-50 p-2 rounded transition-colors cursor-default"
                      >
                        <div className="text-[10px] text-gray-500 mb-1">
                          {label}
                        </div>
                        <div className="font-semibold text-sm text-black">
                          {payload?.[key] != null ? String(payload[key]) : "—"}
                        </div>
                      </div>
                    ))}

                    <div className="text-left hover:bg-gray-50 p-2 rounded transition-colors cursor-default">
                      <div className="text-[10px] text-gray-500 mb-1">
                        Website
                      </div>
                      {payload?.websiteUrl ? (
                        <a
                          href={String(payload.websiteUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-sm text-blue-600 hover:underline break-all"
                        >
                          {String(payload.websiteUrl)}
                        </a>
                      ) : (
                        <div className="font-semibold text-sm text-black">—</div>
                      )}
                    </div>
                  </div>

                  {/* Documents — decorative until file uploads are implemented */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Pitch Deck",
                      "Financial Documents",
                      "Cap Table",
                      "Financial Projections",
                    ].map((doc) => (
                      <span
                        key={doc}
                        className="flex items-center gap-2 p-2.5 bg-[#FFF5F5] rounded cursor-default"
                      >
                        <File className="size-4 text-gray-500" />
                        <div className="flex-1">
                          <div className="font-medium text-xs text-black">
                            {doc}
                          </div>
                        </div>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Approve / Reject — only for pending */}
              {detail.status === "pending" && (
                <ApproveRejectButtons
                  id={detail.id}
                  currentStatus={detail.status}
                  onSuccess={
                    handleStatusUpdate as Parameters<
                      typeof ApproveRejectButtons
                    >[0]["onSuccess"]
                  }
                />
              )}

              {/* Comments and Review Notes */}
              <div className="bg-white rounded-lg border-2 border-gray-300 overflow-hidden">
                <div className="bg-[#F5F5F5] p-4">
                  <h3 className="text-sm font-bold text-black">
                    Comments and Review Notes
                  </h3>
                </div>

                <div className="bg-[#FFF5F5] p-4">
                  {/* Comments list */}
                  <div className="space-y-3 mb-4">
                    {comments.length === 0 ? (
                      <div className="text-xs text-gray-500 py-2">
                        No comments yet.
                      </div>
                    ) : (
                      comments.map((comment, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="size-7 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-semibold text-gray-700">
                              {comment.userName?.[0]?.toUpperCase() ?? "?"}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="font-semibold text-xs text-black">
                                {comment.userName}
                              </span>
                              <span className="text-[10px] text-gray-400">
                                {timeAgo(new Date(comment.createdAt))}
                              </span>
                            </div>
                            <div className="text-xs text-gray-700">
                              {comment.text}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add Comment */}
                  <div className="flex items-start gap-2">
                    <div className="size-7 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-gray-700">
                        {userInitial}
                      </span>
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="..."
                        className="w-full bg-white border border-gray-300 rounded p-2 text-xs resize-none focus:outline-none focus:border-gray-400"
                        rows={2}
                      />
                      <div className="flex justify-end mt-1.5">
                        <button
                          onClick={handleAddComment}
                          disabled={!newComment.trim() || submitting}
                          className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Add Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
