import Link from "next/link";
import PublicLayout from "@/components/layout/PublicLayout";

export default function ApplyPage() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-semibold mb-4">Apply</h1>

        <p className="text-gray-600 mb-8">
          Choose the application you want to start.
        </p>

        {/* links container */}
        <div className="flex flex-col gap-4">
          <Link href="/apply/startup" className="underline">
            Startup Application
          </Link>

          <Link href="/apply/org" className="underline">
            Org Application
          </Link>

          <Link href="/apply/team" className="underline">
            Team Application
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
}
