"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";

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
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [startAt, setStartAt] = useState("");
  const [location, setLocation] = useState("");

  const [message, setMessage] = useState("");

  async function loadEvents() {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/events");
      const data = await res.json();

      if (!res.ok) {
        setEvents([]);
        setMessage(data?.error || "Failed to load events");
        return;
      }

      // Ensure events is always an array
      setEvents(Array.isArray(data) ? data : []);
    } catch {
      setEvents([]);
      setMessage("Failed to load events");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  async function createEvent(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

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
        setMessage(data?.error || "Failed to create event");
        return;
      }

      setMessage("Event created successfully");

      setTitle("");
      setStartAt("");
      setLocation("");

      loadEvents();
    } catch {
      setMessage("Failed to create event");
    }
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold">Admin Events</h1>

      {/* Create Event Form */}
      <form onSubmit={createEvent} className="mt-6 space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Start Time</label>
          <input
            type="datetime-local"
            className="w-full border rounded px-3 py-2"
            value={startAt}
            onChange={(e) => setStartAt(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <button className="border px-4 py-2 rounded hover:bg-gray-50">
          Create Event
        </button>

        {message && (
          <p className="text-sm mt-2 text-red-600">
            {message}
          </p>
        )}
      </form>

      {/* Events Table */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Events</h2>

        {loading ? (
          <p>Loading...</p>
        ) : events.length === 0 ? (
          <p>No events yet.</p>
        ) : (
          <table className="w-full border">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-2 border">Title</th>
                <th className="text-left p-2 border">Start</th>
                <th className="text-left p-2 border">Location</th>
              </tr>
            </thead>

            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="p-2 border">{event.title}</td>
                  <td className="p-2 border">
                    {new Date(event.startAt).toLocaleString()}
                  </td>
                  <td className="p-2 border">{event.location || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}