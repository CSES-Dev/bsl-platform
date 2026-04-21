import { useState } from "react";

const cards = [
  { id: "startup", label: "STARTUP\nAPPLICATION", href: "/apply/startup" },
  { id: "org", label: "ORG/COMPANY\nPROJECT FORM", href: "/apply/org" },
  { id: "student", label: "STUDENT/PRODUCT\nTEAM SKILLS FORM [Mock for now]", href: "#" },
];

export default function StrategicLeadersPage() {
  return (
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
    </div>
  );
}
