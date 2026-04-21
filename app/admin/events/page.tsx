"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AdminLayout from "@/components/admin/AdminLayout";
import { hasRole } from "@/lib/rbac";

type Event = {
  id: string;
  title: string;
  description?: string | null;
  startAt: string;
  endAt?: string | null;
  location?: string | null;
  link?: string | null;
};

export default function AdminEventsPage() {
  const { data: session } = useSession();
  const canCreate = hasRole(session?.user?.role ?? "USER", "AMBASSADOR");

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [startAt, setStartAt] = useState("");
  const [location, setLocation] = useState("");

  const [message, setMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  async function loadEvents() {
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/events");
      const data = await res.json();

      if (!res.ok) {
        setEvents([]);
        setMessage({
          text: data?.error || "Failed to load events",
          isError: true,
        });
        return;
      }

      setEvents(Array.isArray(data) ? data : []);
    } catch {
      setEvents([]);
      setMessage({
        text: "Failed to load events",
        isError: true,
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  async function createEvent(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    try {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, startAt, location }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({
          text: data?.error || "Failed to create event",
          isError: true,
        });
        return;
      }

      setMessage({
        text: "Event created successfully",
        isError: false,
      });

      setTitle("");
      setStartAt("");
      setLocation("");

      loadEvents();
    } catch {
      setMessage({
        text: "Failed to create event",
        isError: true,
      });
    }
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold">Admin Events</h1>

      {canCreate && (
        <form onSubmit={createEvent} className="mt-6 max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              className="w-full rounded border px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Start Time</label>
            <input
              type="datetime-local"
              className="w-full rounded border px-3 py-2"
              value={startAt}
              onChange={(e) => setStartAt(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Location</label>
            <input
              className="w-full rounded border px-3 py-2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <button className="rounded border px-4 py-2 hover:bg-gray-50">
            Create Event
          </button>
        </form>
      )}

      {!canCreate && (
        <p className="mt-6 text-sm text-gray-500">
          You do not have permission to create events.
        </p>
      )}

      {message && (
        <p
          className={`mt-2 text-sm ${
            message.isError ? "text-red-600" : "text-green-600"
          }`}
        >
          {message.text}
        </p>
      )}

      <div className="mt-10">
        <h2 className="mb-4 text-lg font-semibold">Events</h2>

        {loading ? (
          <p>Loading...</p>
        ) : events.length === 0 ? (
          <p>No events yet.</p>
        ) : (
          <table className="w-full border">
            <thead className="bg-gray-50">
              <tr>
                <th className="border p-2 text-left">Title</th>
                <th className="border p-2 text-left">Start</th>
                <th className="border p-2 text-left">Location</th>
              </tr>
            </thead>

            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="border p-2">{event.title}</td>
                  <td className="border p-2">
                    {new Date(event.startAt).toLocaleString()}
                  </td>
                  <td className="border p-2">{event.location || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}