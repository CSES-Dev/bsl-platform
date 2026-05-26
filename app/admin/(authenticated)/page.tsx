import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Search, Bell, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Greeting from "@/components/admin/Greeting";

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

const STATUS_STYLES: Record<string, string> = {
  pending: "text-amber-600",
  approved: "text-emerald-600",
  rejected: "text-red-500",
};

export default async function AdminPage() {
  const [activeStartups, activeOrgs, activeTeams, pendingApps, recentActivity] =
    await Promise.all([
      prisma.application.count({ where: { type: "startup", status: "approved" } }),
      prisma.application.count({ where: { type: "org", status: "approved" } }),
      prisma.application.count({ where: { type: "team", status: "approved" } }),
      prisma.application.findMany({
        where: { status: "pending" },
        orderBy: { createdAt: "desc" },
        take: 4,
        select: { id: true, submitterName: true, type: true, createdAt: true, status: true },
      }),
      prisma.application.findMany({
        orderBy: { updatedAt: "desc" },
        take: 6,
        select: { id: true, submitterName: true, type: true, status: true, createdAt: true, updatedAt: true },
      }),
    ]);

  function activityLabel(app: { submitterName: string; type: string; status: string; createdAt: Date; updatedAt: Date }) {
    if (app.status === "approved") return `Approved ${app.submitterName}'s ${app.type} application`;
    if (app.status === "rejected") return `Rejected ${app.submitterName}'s ${app.type} application`;
    return `${app.submitterName} submitted a ${app.type} application`;
  }

  const statCards = [
    { title: "Active Startups", value: activeStartups, change: "4.21", subtitle: "vs. last month" },
    { title: "Active Organizations", value: activeOrgs, change: "0.21", subtitle: "this quarter" },
    { title: "Active Product Teams", value: activeTeams, change: "1.2", subtitle: "vs. last month" },
  ];

  return (
    <div className="flex flex-col min-h-full">
      {/* Top bar */}
      <div className="h-20 border-b border-gray-400 flex items-center justify-between px-8 gap-4 bg-white">
        <h2 className="text-xl font-semibold text-black">BSL Admin</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-2.5 w-[400px]">
            <Search className="h-5 w-5 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search startups, investors..."
              className="flex-1 bg-transparent outline-none text-sm text-gray-600 placeholder:text-gray-400"
            />
          </div>
          <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Platform Overview</h1>
          <Greeting />
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {statCards.map((s) => (
            <div key={s.title} className="bg-[#FFF5F5] rounded-lg p-6">
              <div className="text-sm font-medium text-gray-600 mb-2">{s.title}</div>
              <div className="flex items-baseline gap-2 mb-1">
                <div className="text-4xl font-bold text-black">{s.value}</div>
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <ArrowUpRight className="h-4 w-4" />
                  {s.change}
                </div>
              </div>
              <div className="text-xs text-gray-500">{s.subtitle}</div>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="grid grid-cols-[1fr_380px] gap-6">
          {/* Pending Approvals */}
          <div className="bg-white rounded-lg border border-gray-400 overflow-hidden">
            <div className="bg-[#F5F5F5] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-black">Pending Approvals</h2>
                  <p className="text-sm text-gray-500">
                    {pendingApps.length} Application{pendingApps.length !== 1 ? "s" : ""} Pending
                  </p>
                </div>
                <Link
                  href="/admin/applications?status=pending"
                  className="text-blue-600 font-medium text-sm flex items-center gap-1 hover:text-blue-700"
                >
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Table header */}
            <div className="bg-[#F5F5F5] border-t border-gray-400 px-6 py-3">
              <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-600">
                <div>Entity</div>
                <div>Type</div>
                <div>Submitted</div>
                <div>Reviewer</div>
                <div>Status</div>
              </div>
            </div>

            {/* Rows */}
            {pendingApps.length === 0 ? (
              <div className="h-16 bg-[#FFF5F5] flex items-center px-6 text-sm text-gray-400">
                No pending applications
              </div>
            ) : (
              pendingApps.map((app) => (
                <Link key={app.id} href={`/admin/applications/${app.id}`}>
                  <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-[#FFF5F5] border-b border-gray-400 last:border-b-0 hover:bg-red-50 transition-colors text-sm">
                    <span className="font-medium text-gray-900 truncate">{app.submitterName}</span>
                    <span className="text-gray-600 capitalize">{app.type}</span>
                    <span className="text-gray-600">{new Date(app.createdAt).toLocaleDateString()}</span>
                    <span className="text-gray-400">—</span>
                    <span className={`font-medium capitalize ${STATUS_STYLES[app.status] ?? "text-gray-600"}`}>
                      {app.status}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg border border-gray-400 overflow-hidden flex flex-col">
            <div className="bg-[#F5F5F5] p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-black">Recent Activity</h2>
                <button className="text-blue-600 font-medium text-sm flex items-center gap-1 hover:text-blue-700">
                  Audit Log
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="bg-[#FFF5F5] p-6 space-y-1 flex-1">
              {recentActivity.length === 0 ? (
                <p className="text-sm text-gray-400">No recent activity</p>
              ) : (
                recentActivity.map((app) => (
                  <div key={app.id} className="flex items-start gap-3 py-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-900">{activityLabel(app)}</div>
                      <div className="text-xs text-gray-500">
                        {timeAgo(new Date(app.updatedAt))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

