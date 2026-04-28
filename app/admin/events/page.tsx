"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { hasRole } from "@/lib/rbac";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [location, setLocation] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

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
    setSaving(true);

    try {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, startAt, endAt, location, link, description }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({
          text: data?.error || "Failed to create event",
          isError: true,
        });
        return;
      }

      setMessage({ text: "Event created successfully", isError: false });
      setTitle("");
      setStartAt("");
      setEndAt("");
      setLocation("");
      setLink("");
      setDescription("");
      loadEvents();
    } catch {
      setMessage({ text: "Failed to create event", isError: true });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Admin Events</h1>
        <p className="mt-1 text-sm text-gray-500">
          Create, review, and delete events shown on the public events page.
        </p>
      </div>

      {message && (
        <p
          className={`rounded-md border px-4 py-3 text-sm ${
            message.isError
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-green-200 bg-green-50 text-green-700"
          }`}
        >
          {message.text}
        </p>
      )}

      {canCreate ? (
        <Card>
          <CardHeader>
            <CardTitle>Create Event</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={createEvent} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startAt">Start Time *</Label>
                  <Input
                    id="startAt"
                    type="datetime-local"
                    value={startAt}
                    onChange={(e) => setStartAt(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endAt">End Time</Label>
                  <Input
                    id="endAt"
                    type="datetime-local"
                    value={endAt}
                    onChange={(e) => setEndAt(e.target.value)}
                    min={startAt}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="link">Link</Label>
                  <Input
                    id="link"
                    type="url"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Creating..." : "Create Event"}
              </button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <p className="text-sm text-gray-500">
          You do not have permission to create events.
        </p>
      )}

      <div>
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
    </div>
  );
}

