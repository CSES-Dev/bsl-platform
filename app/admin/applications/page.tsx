import Link from "next/link";
import { getApplications } from "@/services/mockApplications";

export default function ApplicationsPage() {
  const applications = getApplications();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Applications</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="text-center">
                <td className="px-4 py-2 border">
                  <Link href={`/admin/applications/${app.id}`} className="text-blue-600 hover:underline">
                    {app.name}
                  </Link>
                </td>
                <td className="px-4 py-2 border">{app.email}</td>
                <td className="px-4 py-2 border">{app.role}</td>
                <td className="px-4 py-2 border">{app.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
  