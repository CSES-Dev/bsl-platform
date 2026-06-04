import PublicLayout from "@/components/layout/PublicLayout";
import Link from "next/link";
import { Rocket, Building2, Users, ArrowRight } from "lucide-react";

const community = [
  {
    href: "/startups",
    label: "Startups",
    description: "Browse approved startups building in the BSL ecosystem.",
    Icon: Rocket,
  },
  {
    href: "/organizations",
    label: "Organizations",
    description: "Companies and orgs seeking skilled product teams.",
    Icon: Building2,
  },
  {
    href: "/teams",
    label: "Teams",
    description: "Product teams looking for their next project.",
    Icon: Users,
  },
];

export default function Page() {
  return (
    <PublicLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute -left-32 -top-24 h-96 w-96 rounded-full bg-rose-100/70" />
        <div className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-sky-100/60" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 pb-20 pt-24 text-center">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.3em] text-gray-500">
            Big Strategy Labs
          </p>
          <h1 className="text-5xl font-black leading-tight text-black md:text-6xl">
            An invite-only hub for
            <br />
            innovation &amp;{" "}
            <span className="relative inline-block">
              strategic growth
              <span className="absolute -bottom-1 left-0 h-1 w-full bg-cyan-400" />
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-gray-700">
            A private network connecting founders, organizations, and product
            teams to the people and resources that move them forward.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Apply <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="rounded-full border-2 border-gray-300 px-8 py-3 text-base font-semibold text-gray-800 transition-colors hover:border-black hover:bg-gray-50"
            >
              Learn More
            </Link>
            <Link
              href="/about"
              className="rounded-full border-2 border-gray-300 px-8 py-3 text-base font-semibold text-gray-800 transition-colors hover:border-black hover:bg-gray-50"
            >
              Meet Our Leaders
            </Link>
          </div>
        </div>
      </section>

      {/* EXPLORE OUR COMMUNITY */}
      <section className="bg-white px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black text-black md:text-4xl">
              Explore Our Community
            </h2>
            <p className="mt-3 text-lg text-gray-600">
              Discover the startups, organizations, and teams in the network.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {community.map(({ href, label, description, Icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col rounded-3xl bg-[#d3e9f6] p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/60">
                  <Icon className="h-10 w-10 text-blue-600" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-extrabold text-black">{label}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                  {description}
                </p>
                <span className="mt-6 inline-flex items-center gap-1 font-bold text-blue-600">
                  Browse
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="bg-white px-6 pb-24">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-[#d3e9f6] px-8 py-16 text-center">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-rose-100/70" />
          <div className="pointer-events-none absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-white/40" />
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-black md:text-4xl">
              Ready to join the network?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-lg text-gray-700">
              Apply as a startup, organization, or product team and get access
              to the BSL ecosystem.
            </p>
            <Link
              href="/apply"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-10 py-3 text-base font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Apply Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
