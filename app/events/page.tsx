import { cookies } from "next/headers";
import PublicLayout from "@/components/layout/PublicLayout";
import { prisma } from "@/lib/prisma";
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
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">Events</h1>
          <p className="mt-2 text-gray-600">
            Explore upcoming BSL events, meetings, and opportunities.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="rounded-2xl border bg-white p-8 text-gray-600 shadow-sm">
            No upcoming events right now. Check back soon.
          </div>
        ) : (
          <ul className="space-y-5">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                alreadyInterested={cookieStore.has(
                  `bsl_interested_${event.id}`,
                )}
              />
            ))}
          </ul>
        )}
      </div>
    </PublicLayout>
  );
}
