import { prisma } from "@/lib/prisma";
import ProfileDropdown from "@/components/admin/ProfileDropdown";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const stats = [
  { label: "Pending", status: "pending", color: "text-amber-600" },
  { label: "Approved", status: "approved", color: "text-emerald-600" },
  { label: "Rejected", status: "rejected", color: "text-red-600" },
];

export default async function AdminPage() {
  const [pending, approved, rejected] = await Promise.all([
    prisma.application.count({ where: { status: "pending" } }),
    prisma.application.count({ where: { status: "approved" } }),
    prisma.application.count({ where: { status: "rejected" } }),
  ]);

  const counts = { pending, approved, rejected };

  return (
    <div>
      <div className="flex items-center justify-between border-b border-gray-100 pb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <ProfileDropdown />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(({ label, status, color }) => (
          <Card key={status}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-500">
                {label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-3xl font-bold ${color}`}>
                {counts[status as keyof typeof counts]}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
