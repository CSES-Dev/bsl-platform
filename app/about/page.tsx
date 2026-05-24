"use client";

import { useState } from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import { leaders, type Leader } from "../../data/leaders";
import Image from "next/image";
import LeadersMap from "@/components/about/LeadersMap";

const BLUE = "#38BFE8";
const LIGHT_BLUE = "#C9F1FB";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<"team" | "map">("team");

  const handleSelectLeader = (leader: Leader) => {
    setActiveTab("team");
    requestAnimationFrame(() => {
      const el = document.getElementById(`leader-${slugify(leader.name)}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("ring-4");
        setTimeout(() => el.classList.remove("ring-4"), 1500);
      }
    });
  };

  return (
    <PublicLayout>
      <main className="mx-auto max-w-6xl px-6 pb-16 pt-16">
        {/* HERO */}
        <section className="text-center">
          <h1 className="mx-auto max-w-[620px] text-left text-[34px] font-bold leading-[1.18] tracking-tight md:text-[36px]">
            An invite-only hub for innovation,
            <br />
            leadership, and strategic growth
          </h1>

          {/* TABS */}
          <div className="relative mx-auto mt-8 flex w-fit items-center justify-center">
            <div
              className="absolute left-[14px] right-[14px] top-1/2 h-[12px] -translate-y-1/2 border-y-[3px]"
              style={{
                borderColor: BLUE,
                backgroundColor: LIGHT_BLUE,
              }}
            />

            <button
              type="button"
              onClick={() => setActiveTab("map")}
              className="relative z-10 h-[42px] rounded-[6px] border-[3px] px-7 text-[18px] font-normal tracking-wide"
              style={{
                borderColor: BLUE,
                backgroundColor: activeTab === "map" ? LIGHT_BLUE : "white",
              }}
            >
              MAPPING LEADERS
            </button>

            <div className="w-14" />

            <button
              type="button"
              onClick={() => setActiveTab("team")}
              className="relative z-10 h-[42px] rounded-[6px] border-[3px] px-7 text-[18px] font-normal tracking-wide"
              style={{
                borderColor: BLUE,
                backgroundColor: activeTab === "team" ? LIGHT_BLUE : "white",
              }}
            >
              MEET THE TEAM
            </button>
          </div>
        </section>

        {/* CONTENT */}
        <section className="mt-24">
          {activeTab === "team" && (
            <div className="space-y-14">
              {leaders.map((leader, index) => {
                const isReversed = index % 2 !== 0;

                return (
                  <div
                    key={leader.name}
                    id={`leader-${slugify(leader.name)}`}
                    className={`mx-auto grid max-w-[980px] scroll-mt-24 grid-cols-1 items-center gap-8 rounded-[18px] px-8 py-5 ring-[${BLUE}] transition-shadow md:min-h-[310px] md:px-8 md:py-5 ${
                      isReversed
                        ? "md:grid-cols-[1fr_300px]"
                        : "md:grid-cols-[300px_1fr]"
                    }`}
                    style={{ backgroundColor: LIGHT_BLUE }}
                  >
                    {/* IMAGE */}
                    <div
                      className={`h-[300px] w-full overflow-hidden rounded-[14px] bg-white md:w-[300px] ${
                        isReversed ? "md:order-2 md:ml-auto" : "md:order-1"
                      }`}
                    >
                      {leader.image ? (
                        <div className="relative h-full w-full">
                        <Image
                          src={leader.image}
                          alt={leader.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      ) : (
                        <div
                          className="flex h-full w-full items-center justify-center text-5xl font-bold"
                          style={{ color: BLUE }}
                        >
                          {leader.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")}
                        </div>
                      )}
                    </div>

                    {/* TEXT */}
                    <div
                      className={`flex w-full flex-col justify-center text-center md:text-left ${
                        isReversed
                          ? "md:order-1 md:pl-6 md:pr-8"
                          : "md:order-2 md:pl-8 md:pr-6"
                      }`}
                    >
                      <h3 className="text-[32px] font-semibold leading-none tracking-tight">
                        {leader.name}
                      </h3>

                      <p className="mt-6 text-[25px] leading-none text-black">
                        {leader.title}
                      </p>

                      <p className="mt-6 max-w-[560px] text-[22px] leading-[1.22] text-black">
                        {leader.bio}
                      </p>

                      <a
                        href={`mailto:${leader.email}`}
                        className="mx-auto mt-9 inline-flex w-fit items-center justify-center rounded-full border-[3px] px-5 py-1 text-[16px] font-bold leading-none tracking-[0.12em] text-white md:mx-0"
                        style={{
                          backgroundColor: BLUE,
                          borderColor: "white",
                          outline: `3px solid ${BLUE}`,
                        }}
                      >
                        CONTACT
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "map" && (
            <LeadersMap
              leaders={leaders}
              onSelectLeader={handleSelectLeader}
            />
          )}
        </section>
      </main>
    </PublicLayout>
  );
}