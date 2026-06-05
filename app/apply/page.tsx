"use client";

import { useState } from "react";
import { Rocket, Users, Folder, type LucideIcon } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import Modal from "@/components/ui/Modal";
import StartupForm from "@/components/forms/StartupForm";
import OrgForm from "@/components/forms/OrgForm";
import TeamForm from "@/components/forms/TeamForm";

type ModalState = "startup" | "org" | "team" | null;

const cards: {
  id: NonNullable<ModalState>;
  title: string;
  description: string;
  Icon: LucideIcon;
}[] = [
  {
    id: "startup",
    title: "Startups",
    description:
      "Browse our gallery of startups and apply to join the BSL network as a founding company.",
    Icon: Rocket,
  },
  {
    id: "org",
    title: "Companies/Orgs",
    description:
      "Apply to spin up a dedicated project team for your organization and tap into our talent network.",
    Icon: Users,
  },
  {
    id: "team",
    title: "Product Teams",
    description:
      "Apply to join a product team matched to your specific skillset and build alongside top operators.",
    Icon: Folder,
  },
];

export default function ApplyPage() {
  const [openModal, setOpenModal] = useState<ModalState>(null);

  const closeModal = () => setOpenModal(null);

  return (
    <PublicLayout>
      <div className="relative min-h-[calc(100vh-7rem)] bg-white overflow-hidden flex flex-col px-6 pt-16 pb-20">
        {/* Background Decorative Blobs */}
        <div className="pointer-events-none absolute -left-32 top-12 h-96 w-96 rounded-full bg-rose-100/70" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-rose-100/70" />

        <div className="relative z-10 text-center max-w-4xl mx-auto mb-4">
          <h1 className="text-5xl font-black text-black leading-tight mb-3">
            Apply to Join a Private
            <br />
            <span className="relative inline-block">
              Network of Strategic Leaders
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-cyan-400" />
            </span>
          </h1>
          <p className="text-gray-700 text-xl mt-6 leading-relaxed">
            Learn from our executive strategy playbook
            <br />
            and get access to our network of strategic leaders.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-8 mt-10 w-full max-w-5xl mx-auto justify-center items-stretch">
          {cards.map(({ id, title, description, Icon }) => (
            <div
              key={id}
              className="flex-1 min-h-[30rem] bg-[#d3e9f6] rounded-3xl flex flex-col p-8"
            >
              <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-white/60">
                <Icon className="h-16 w-16 text-blue-600" strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-extrabold text-black mb-3">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {description}
              </p>
              <button
                onClick={() => setOpenModal(id)}
                className="mt-auto mx-auto rounded-full bg-white px-12 py-3 text-base font-bold text-black underline underline-offset-2 shadow-sm transition-colors hover:bg-gray-50 cursor-pointer"
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Steps 6-10: Modal Implementation */}
      <Modal
        isOpen={openModal !== null}
        onClose={closeModal}
        title={
          openModal === "startup"
            ? "STARTUP APPLICATION"
            : openModal === "org"
              ? "ORG/COMPANY PROJECT FORM"
              : openModal === "team"
                ? "STUDENT/PRODUCT TEAM SKILLS FORM"
                : ""
        }
      >
        <div className="mt-2">
          {openModal === "startup" && <StartupForm onSuccess={closeModal} />}
          {openModal === "org" && <OrgForm onSuccess={closeModal} />}
          {openModal === "team" && <TeamForm onSuccess={closeModal} />}
        </div>
      </Modal>
    </PublicLayout>
  );
}
