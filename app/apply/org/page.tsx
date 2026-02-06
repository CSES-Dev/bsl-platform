import Link from "next/link";
import PublicLayout from "@/components/layout/PublicLayout";

export default function OrgApplyPage() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-2xl font-semibold">
          Organization Application
        </h1>
        <p className="mt-2 text-gray-600">Coming soon.</p>

        <Link href="/apply" className="mt-6 inline-block underline">
          Back to Apply
        </Link>
      </div>
    </PublicLayout>
  );
}

