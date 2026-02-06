import Link from "next/link";
import PublicLayout from "@/components/layout/PublicLayout";

export default function StartupApplyPage() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-2xl font-semibold">Startup Application</h1>
        <p className="mt-2 text-gray-600">Coming soon.</p>

        <Link href="/apply" className="mt-6 inline-block underline">
          Back to Apply
        </Link>
      </div>
    </PublicLayout>
  );
}
