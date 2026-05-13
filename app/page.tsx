import PublicLayout from "@/components/layout/PublicLayout";
import Link from "next/link";

const galleryLinks = [
  { href: "/startups", label: "Startups" },
  { href: "/organizations", label: "Organizations" },
  { href: "/teams", label: "Teams" },
];

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
          <Link
            href="/leaders"
            className="px-6 py-2 bg-white text-black font-medium hover:bg-black hover:text-white border-2 border-black transition-colors"
          >
            Meet Our Leaders
          </Link>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight">Explore Our Community</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {galleryLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-6 py-8 bg-white text-black font-medium hover:bg-black hover:text-white border-2 border-black transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
