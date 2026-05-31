"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { hasRole } from "@/lib/rbac";
import Modal from "@/components/ui/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { EVENT_TYPES } from "@/lib/eventTypes";
import { Trash2, Loader2 } from "lucide-react";

type Event = {
  id: string;
  title: string;
  type?: string | null;
  description?: string | null;
  startAt: string;
  endAt?: string | null;
  location?: string | null;
  link?: string | null;
  capacity?: number | null;
  interestedCount?: number | null;
};

type Tab = "Upcoming" | "Past" | "All";

type FormState = {
  title: string;
  type: string;
  description: string;
  startAt: string;
  endAt: string;
  location: string;
  link: string;
  capacity: string;
};

const emptyForm: FormState = {
  title: "",
  type: "",
  description: "",
  startAt: "",
  endAt: "",
  location: "",
  link: "",
  capacity: "",
};

function toDatetimeLocal(value?: string | null) {
  if (!value) return "";

  const date = new Date(value);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
}

function formatDateTime(value: string) {
  const date = new Date(value);

  return {
    date: date.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    time: date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

export default function AdminEventsPage() {
  const { data: session } = useSession();
  const canManage = hasRole(session?.user?.role ?? "USER", "AMBASSADOR");

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<Tab>("Upcoming");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

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

  const filteredEvents = useMemo(() => {
    const now = new Date();

    return events.filter((event) => {
      const start = new Date(event.startAt);

      if (activeTab === "Upcoming") return start >= now;
      if (activeTab === "Past") return start < now;
      return true;
    });
  }, [events, activeTab]);

  function openCreateModal() {
    setEditingEvent(null);
    setForm(emptyForm);
    setMessage(null);
    setIsModalOpen(true);
  }

  function openEditModal(event: Event) {
    setEditingEvent(event);
    setForm({
      title: event.title || "",
      type: event.type || "",
      description: event.description || "",
      startAt: toDatetimeLocal(event.startAt),
      endAt: toDatetimeLocal(event.endAt),
      location: event.location || "",
      link: event.link || "",
      capacity: event.capacity?.toString() || "",
    });
    setMessage(null);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingEvent(null);
    setForm(emptyForm);
  }

  async function saveEvent(e: React.FormEvent) {
    e.preventDefault();

    if (!canManage) return;

    setSaving(true);
    setMessage(null);

    const payload = {
      title: form.title,
      type: form.type || null,
      description: form.description || null,
      startAt: form.startAt,
      endAt: form.endAt || null,
      location: form.location || null,
      link: form.link || null,
      capacity: form.capacity || null,
    };

    try {
      const res = await fetch(
        editingEvent
          ? `/api/admin/events/${editingEvent.id}`
          : "/api/admin/events",
        {
          method: editingEvent ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage({
          text: data?.error || "Failed to save event",
          isError: true,
        });
        return;
      }

      setMessage({
        text: editingEvent
          ? "Event updated successfully"
          : "Event created successfully",
        isError: false,
      });

      closeModal();
      await loadEvents();
    } catch {
      setMessage({ text: "Failed to save event", isError: true });
    } finally {
      setSaving(false);
    }
  }

  async function deleteEvent(event: Event, e: React.MouseEvent) {
    e.stopPropagation();

    if (!canManage) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${event.title}"?`
    );

    if (!confirmed) return;

    setDeletingId(event.id);
    setMessage(null);

    try {
      const res = await fetch(`/api/admin/events/${event.id}`, {
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

  function renderInvitees(event: Event) {
    const count = event.interestedCount ?? 0;

    if (event.capacity) {
      const percent = Math.min((count / event.capacity) * 100, 100);

      return (
        <div className="flex items-center gap-3">
          <div className="h-2 w-24 rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-neutral-700"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="text-xs text-gray-700">
            {count}/{event.capacity}
          </span>
        </div>
      );
    }

    if (count > 0) return <span>{count}</span>;

    return <span className="text-gray-400">—</span>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-black">
            Event Management
          </h1>
          <p className="mt-1 text-sm font-medium text-gray-500">
            Manage roundtables, pitch nights, demo days, and conferences across
            the network.
          </p>
        </div>

        {canManage && (
          <button
            type="button"
            onClick={openCreateModal}
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
          >
            + New Event
          </button>
        )}
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

      <div className="overflow-hidden rounded-2xl bg-[#FDF8F8]">
        <div className="flex items-center gap-8 border-b border-gray-300 px-4 pt-3">
          {(["Upcoming", "Past", "All"] as Tab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-semibold ${
                activeTab === tab
                  ? "border-b-2 border-black text-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {tab}
              {tab === "Upcoming" && (
                <span className="ml-2 rounded bg-gray-200 px-1.5 py-0.5 text-xs">
                  {
                    events.filter((event) => new Date(event.startAt) >= new Date())
                      .length
                  }
                </span>
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="px-4 py-10 text-sm text-gray-500">Loading events...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-300 bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Event</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Date & Time</th>
                  <th className="px-4 py-3 font-semibold">Venue</th>
                  <th className="px-4 py-3 font-semibold">Invitees</th>
                  <th className="px-4 py-3 font-semibold"></th>
                </tr>
              </thead>

              <tbody>
                {filteredEvents.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-12 text-center text-sm text-gray-500"
                    >
                      No events found.
                    </td>
                  </tr>
                ) : (
                  filteredEvents.map((event) => {
                    const formatted = formatDateTime(event.startAt);

                    return (
                      <tr
                        key={event.id}
                        onClick={() => canManage && openEditModal(event)}
                        className="cursor-pointer border-b border-gray-300 hover:bg-black/5"
                      >
                        <td className="px-4 py-4 font-semibold text-gray-900">
                          {event.title}
                        </td>
                        <td className="px-4 py-4 text-gray-700">
                          {event.type || "—"}
                        </td>
                        <td className="px-4 py-4 text-gray-900">
                          <div className="font-semibold">{formatted.date}</div>
                          <div className="text-xs text-gray-600">
                            {formatted.time}
                          </div>
                        </td>
                        <td className="px-4 py-4 font-medium text-gray-700">
                          {event.location || "—"}
                        </td>
                        <td className="px-4 py-4">
                          {renderInvitees(event)}
                        </td>
                        <td className="px-4 py-4 text-right">
                          {canManage && (
                            <button
                              type="button"
                              onClick={(e) => deleteEvent(event, e)}
                              disabled={deletingId === event.id}
                              className="rounded-md px-2 py-1 text-sm text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                              aria-label="Delete event"
                            >
                              {deletingId === event.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form onSubmit={saveEvent} className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-black">
              {editingEvent ? "Edit Event" : "New Event"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {editingEvent
                ? "Update this event's details."
                : "Create a new event for the BSL network."}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <select
                id="type"
                value={form.type}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, type: e.target.value }))
                }
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Select type</option>
                {EVENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                min="1"
                value={form.capacity}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, capacity: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="startAt">Start *</Label>
              <Input
                id="startAt"
                type="datetime-local"
                value={form.startAt}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, startAt: e.target.value }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endAt">End</Label>
              <Input
                id="endAt"
                type="datetime-local"
                value={form.endAt}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, endAt: e.target.value }))
                }
                min={form.startAt}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={form.location}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, location: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="link">Link</Label>
              <Input
                id="link"
                type="url"
                value={form.link}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, link: e.target.value }))
                }
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : editingEvent
                  ? "Save Changes"
                  : "Create Event"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
