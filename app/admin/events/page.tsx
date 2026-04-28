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
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [location, setLocation] = useState("");
  const [link, setLink] = useState("");

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description: description || null,
          startAt,
          endAt: endAt || null,
          location: location || null,
          link: link || null,
        }),
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
      setDescription("");
      setStartAt("");
      setEndAt("");
      setLocation("");
      setLink("");

      await loadEvents();
    } catch {
      setMessage({ text: "Failed to create event", isError: true });
    } finally {
      setSaving(false);
    }
  }

  async function deleteEvent(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmed) return;

    setDeletingId(id);
    setMessage(null);

    try {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({
          text: data?.error || "Failed to delete event",
          isError: true,
        });
        return;
      }
      
      setMessage({ text: "Event deleted successfully", isError: false });
      await loadEvents();
    } catch {
      setMessage({ text: "Failed to delete event", isError: true });
    } finally {
      setDeletingId(null);
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

      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-gray-500">Loading events...</p>
          ) : events.length === 0 ? (
            <p className="text-sm text-gray-500">No events yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-3 font-medium">Title</th>
                    <th className="px-4 py-3 font-medium">Start</th>
                    <th className="px-4 py-3 font-medium">End</th>
                    <th className="px-4 py-3 font-medium">Location</th>
                    <th className="px-4 py-3 font-medium">Link</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.id} className="border-b last:border-0">
                      <td className="px-4 py-3 font-medium">
                        <div>{event.title}</div>
                        {event.description && (
                          <p className="mt-1 max-w-md text-xs text-gray-500">
                            {event.description}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {new Date(event.startAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        {event.endAt
                          ? new Date(event.endAt).toLocaleString()
                          : "—"}
                      </td>
                      <td className="px-4 py-3">{event.location || "—"}</td>
                      <td className="px-4 py-3">
                        {event.link ? (
                          <a
                            href={event.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Open
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {canCreate && (
                          <button
                            type="button"
                            onClick={() => deleteEvent(event.id)}
                            disabled={deletingId === event.id}
                            className="rounded-md border border-red-200 px-3 py-1 text-sm text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {deletingId === event.id ? "Deleting..." : "Delete"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
