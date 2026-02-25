import PublicLayout from "@/components/layout/PublicLayout";
import Link from "next/link";

export default function Page() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-4xl px-6 py-12 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">BIG STRATEGY LABS</h1>
        <p className="text-gray-700 leading-relaxed mt-4">
          An invite-only hub for innovation, leadership, and strategic growth.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/apply"
            className="px-6 py-2 bg-black text-white font-medium hover:bg-white hover:text-black border-2 border-black transition-colors"
          >
            Apply
          </Link>
          <Link
            href="/about"
            className="px-6 py-2 bg-white text-black font-medium hover:bg-black hover:text-white border-2 border-black transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
}