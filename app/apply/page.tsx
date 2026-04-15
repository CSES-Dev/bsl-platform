import Link from "next/link";
import PublicLayout from "@/components/layout/PublicLayout";

export default function ApplyPage() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-4xl font-semibold tracking-tight">Apply</h1>
        <p className="text-gray-700 leading-relaxed mt-3">
          Choose the application you want to start.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-3">Application Types</h2>
          <div className="flex flex-col gap-4">
            <Link
              href="/apply/startup"
              className="underline text-gray-700 hover:text-black"
            >
              Startup Application
            </Link>
            <Link
              href="/apply/organization"
              className="underline text-gray-700 hover:text-black"
            >
              Org Application
            </Link>
            <Link
              href="/apply/team"
              className="underline text-gray-700 hover:text-black"
            >
              Team Application
            </Link>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
