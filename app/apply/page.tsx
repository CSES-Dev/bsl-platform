import Link from "next/link";
import PublicLayout from "@/components/layout/PublicLayout";

const cards = [
  { id: "startup", label: "STARTUP\nAPPLICATION", href: "/apply/startup" },
  { id: "org", label: "ORG/COMPANY\nPROJECT FORM", href: "/apply/organization" },
  { id: "team", label: "STUDENT/PRODUCT\nTEAM SKILLS FORM", href: "/apply/team" },
];

export default function ApplyPage() {
  return (
    <PublicLayout>
      <div className="relative min-h-screen bg-white overflow-hidden flex flex-col items-center px-6 py-16">
        <div className="absolute top-0 left-0 w-64 h-64 bg-rose-100 rounded-full -translate-x-1/3 -translate-y-1/4 opacity-70" />
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-rose-100 rounded-full translate-x-1/4 translate-y-1/4 opacity-70" />

        <div className="relative z-10 text-center max-w-2xl mb-4">
          <h1 className="text-4xl font-black text-black leading-tight mb-3">
            Apply to Join a Private<br />
            <span className="relative inline-block">
              Network of Strategic Leaders
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-cyan-400" />
            </span>
          </h1>
          <p className="text-gray-500 text-lg mt-4 leading-relaxed">
            Learn from our executive strategy playbook<br />
            and get access to our network of strategic leaders.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-6 mt-10 w-full max-w-4xl justify-center">
          {cards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="flex-1 min-h-96 bg-sky-100 rounded-3xl flex items-start justify-start p-6 hover:bg-sky-200 hover:shadow-md transition-all duration-200 group"
            >
              <span className="text-black font-bold text-lg uppercase tracking-wide leading-snug whitespace-pre-line group-hover:text-cyan-700 transition-colors">
                {card.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
