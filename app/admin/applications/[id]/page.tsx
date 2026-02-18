import Link from "next/link";
import { getApplicationById } from "@/services/mockApplications";

type Props = {
  params: { id: string };
};

export default function ApplicationDetail({ params }: Props) {
  const { id } = params;
  const app = getApplicationById(id);

  if (!app) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">Application not found</h2>
        <p className="mt-2">No mock application matches id {id}.</p>
        <Link href="/admin/applications" className="text-blue-600 hover:underline mt-4 inline-block">
          Back to applications
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Application: {app.name}</h1>
        <Link href="/admin/applications" className="text-blue-600 hover:underline">
          Back
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <DetailRow label="ID" value={String(app.id)} />
          <DetailRow label="Name" value={app.name} />
          <DetailRow label="Email" value={app.email} />
          <DetailRow label="Phone" value={app.phone ?? "—"} />
          <DetailRow label="Location" value={app.location ?? "—"} />
          <DetailRow label="Role" value={app.role} />
          <DetailRow label="Status" value={app.status} />
          <DetailRow label="Created At" value={app.createdAt ?? "—"} />
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Resume / Portfolio</h3>
            <ul className="mt-2 list-disc list-inside text-sm">
              {app.resumeUrl && (
                <li>
                  <a href={app.resumeUrl} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
                    Resume
                  </a>
                </li>
              )}
              {app.portfolio && (
                <li>
                  <a href={app.portfolio} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
                    Portfolio
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-medium">Answers</h3>
            <div className="mt-2 space-y-2 text-sm">
              {app.answers && Object.entries(app.answers).length > 0 ? (
                Object.entries(app.answers).map(([q, a]) => (
                  <div key={q} className="p-3 border rounded">
                    <div className="font-medium">{q}</div>
                    <div className="text-gray-700 mt-1">{a}</div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-600">No answers provided.</div>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-medium">Notes</h3>
            <div className="mt-2 p-3 border rounded text-sm">{app.notes ?? "—"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-start">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}
