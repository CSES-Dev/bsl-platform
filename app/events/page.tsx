import PublicLayout from "@/components/layout/PublicLayout";
import { prisma } from "@/lib/prisma";

export default async function EventsPage() {
  let events: {
    id: string;
    title: string;
    startAt: Date;
    location: string | null;
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
        startAt: true,
        location: true,
      },
    });
  } catch (err) {
    console.error("[EventsPage]", err);
  }

  return (
    <PublicLayout>
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-semibold">Events</h1>
        <p className="mt-2 text-gray-600">Upcoming events</p>

        {events.length === 0 ? (
          <div className="mt-8 rounded-lg border p-6 text-gray-600">
            No upcoming events right now. Check back soon.
          </div>
        ) : (
          <ul className="mt-8 space-y-4">
            {events.map((event) => (
              <li key={event.id} className="rounded-lg border p-4">
                <div className="font-medium">{event.title}</div>
                <div className="mt-1 text-sm text-gray-600">
                  {event.startAt.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  {event.location ? ` • ${event.location}` : ""}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </PublicLayout>
  );
}
