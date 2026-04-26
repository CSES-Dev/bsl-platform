import PublicLayout from "@/components/layout/PublicLayout";
import { prisma } from "@/lib/prisma";

export default async function EventsPage() {
  let events: {
    id: string;
    title: string;
    description: string | null;
    startAt: Date;
    endAt: Date | null;
    location: string | null;
    link: string | null;
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
              <li
                key={event.id}
                className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{event.title}</h2>

                    <p className="mt-2 text-sm text-gray-600">
                      {event.startAt.toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                      {" at "}
                      {event.startAt.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                      {event.endAt
                        ? ` - ${event.endAt.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                          })}`
                        : ""}
                    </p>

                    {event.location && (
                      <p className="mt-1 text-sm text-gray-600">
                        {event.location}
                      </p>
                    )}

                    {event.description && (
                      <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-700">
                        {event.description}
                      </p>
                    )}
                  </div>

                  {event.link && (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center justify-center rounded-full border px-4 py-2 text-sm font-medium hover:bg-gray-50"
                    >
                      View Details
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </PublicLayout>
  );
}