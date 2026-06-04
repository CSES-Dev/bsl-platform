import { cookies } from "next/headers";
import Link from "next/link";
import { CalendarDays, ArrowRight } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import { prisma } from "@/lib/prisma";
import { interestCookieName } from "@/lib/cookies";
import { EventCard } from "./_components/EventCard";

export default async function EventsPage() {
  const cookieStore = await cookies();
  let events: {
    id: string;
    title: string;
    description: string | null;
    startAt: Date;
    endAt: Date | null;
    location: string | null;
    link: string | null;
    interestedCount: number;
  }[] = [];

  try {
    events = await prisma.event.findMany({
      where: {
        startAt: { gte: new Date() },
      },
      orderBy: {
        startAt: "asc",
      },
      select: {
        id: true,
        title: true,
        description: true,
        startAt: true,
        endAt: true,
        location: true,
        link: true,
        interestedCount: true,
      },
    });
  } catch (err) {
    console.error("[EventsPage]", err);
  }

  return (
    <PublicLayout>
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute -left-32 -top-24 h-96 w-96 rounded-full bg-rose-100/60" />
        <div className="pointer-events-none absolute -right-24 top-32 h-72 w-72 rounded-full bg-sky-100/50" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-20">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-black leading-tight text-black md:text-5xl">
              Upcoming{" "}
              <span className="relative inline-block">
                Events
                <span className="absolute -bottom-1 left-0 h-1 w-full bg-cyan-400" />
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-gray-600">
              Roundtables, demo days, and gatherings across the BSL network.
            </p>
          </div>

          {events.length === 0 ? (
            <div className="relative overflow-hidden rounded-3xl bg-[#d3e9f6] px-8 py-16 text-center">
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/40" />
              <div className="relative z-10">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/70">
                  <CalendarDays className="h-10 w-10 text-blue-600" strokeWidth={2} />
                </div>
                <h2 className="text-2xl font-extrabold text-black">
                  No upcoming events yet
                </h2>
                <p className="mx-auto mt-2 max-w-md text-gray-600">
                  New BSL events, roundtables, and demo days will show up here.
                  Check back soon.
                </p>
                <Link
                  href="/apply"
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-black px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                >
                  Apply to join the network
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ) : (
            <ul className="space-y-5">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  alreadyInterested={cookieStore.has(
                    interestCookieName(event.id),
                  )}
                />
              ))}
            </ul>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
