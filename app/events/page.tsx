"use client";

import { useEffect, useState } from "react";
import PublicLayout from "@/components/layout/PublicLayout";

type Event = {
  id: string;
  title?: string | null;
  name?: string | null;
  startAt: string; // ISO string coming from JSON
  location?: string | null;
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[] | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/events");
      if (!res.ok) {
        setEvents([]);
        return;
      }
      const data = (await res.json()) as Event[];
      setEvents(data);
    }
    load();
  }, []);

  const items = events ?? [];

  return (
    <PublicLayout>
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-semibold">Events</h1>
        <p className="mt-2 text-gray-600">Upcoming events</p>

        {events === null ? (
          <div className="mt-8 text-gray-600">Loading…</div>
        ) : items.length === 0 ? (
          <div className="mt-8 rounded-lg border p-6 text-gray-600">
            No upcoming events right now. Check back soon.
          </div>
        ) : (
          <ul className="mt-8 space-y-4">
            {items.map((e) => (
              <li key={e.id} className="rounded-lg border p-4">
                <div className="font-medium">
                  {e.title ?? e.name ?? "Untitled event"}
                </div>
                <div className="mt-1 text-sm text-gray-600">
                  {new Date(e.startAt).toLocaleString()}
                  {e.location ? ` • ${e.location}` : ""}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </PublicLayout>
  );
}
