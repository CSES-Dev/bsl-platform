"use client";

import { useRef, useState } from "react";
import { Calendar, MapPin, ExternalLink, Check, Heart } from "lucide-react";
import { googleCalendarUrl } from "@/lib/calendar";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string | null;
    startAt: Date;
    endAt: Date | null;
    location: string | null;
    link: string | null;
    interestedCount: number;
  };
  alreadyInterested: boolean;
}

const TIME_ZONE = "America/Los_Angeles";

function formatKicker(startAt: Date, endAt: Date | null) {
  const datePart = startAt.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: TIME_ZONE,
  });
  const startTime = startAt.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: TIME_ZONE,
  });
  const endTime = endAt
    ? endAt.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: TIME_ZONE,
      })
    : null;
  const timePart = endTime ? `${startTime} – ${endTime} PT` : `${startTime} PT`;
  return { datePart, timePart };
}

function formatBadge(startAt: Date) {
  const month = startAt
    .toLocaleDateString("en-US", { month: "short", timeZone: TIME_ZONE })
    .toUpperCase();
  const day = startAt.toLocaleDateString("en-US", {
    day: "numeric",
    timeZone: TIME_ZONE,
  });
  return { month, day };
}

const primaryBtn =
  "inline-flex items-center justify-center gap-1.5 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800";
const outlineBtn =
  "inline-flex items-center justify-center gap-1.5 rounded-full border-2 border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-800 transition-colors hover:border-black hover:bg-gray-50";

export function EventCard({ event, alreadyInterested }: EventCardProps) {
  const [count, setCount] = useState(event.interestedCount);
  const [expressedInterest, setExpressedInterest] = useState(alreadyInterested);
  const inFlight = useRef(false);

  async function handleExpressInterest() {
    if (inFlight.current) return;
    inFlight.current = true;
    const previousCount = count;
    setCount((c) => c + 1);
    setExpressedInterest(true);

    try {
      const res = await fetch(`/api/events/${event.id}/interest`, {
        method: "POST",
      });

      if (res.ok) {
        const data: { interestedCount: number } = await res.json();
        setCount(data.interestedCount);
      } else {
        setCount(previousCount);
        if (res.status !== 409) setExpressedInterest(false);
      }
    } catch {
      setCount(previousCount);
      setExpressedInterest(false);
    } finally {
      inFlight.current = false;
    }
  }

  function handleAddToCalendar() {
    window.open(
      googleCalendarUrl({
        title: event.title,
        description: event.description,
        startAt: event.startAt,
        endAt: event.endAt,
        location: event.location,
      }),
      "_blank",
      "noopener,noreferrer",
    );
  }

  const { datePart, timePart } = formatKicker(event.startAt, event.endAt);
  const { month, day } = formatBadge(event.startAt);

  return (
    <li className="flex gap-5 rounded-3xl border border-sky-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
      {/* Date badge */}
      <div className="hidden h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-[#d3e9f6] sm:flex">
        <span className="text-xs font-bold uppercase tracking-wide text-blue-600">
          {month}
        </span>
        <span className="text-3xl font-black leading-none text-black">
          {day}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.1em] text-sky-500">
            <Calendar className="h-4 w-4" strokeWidth={2.5} />
            <span>
              {datePart} · {timePart}
            </span>
          </div>
          {count > 0 && (
            <span
              aria-live="polite"
              className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-600"
            >
              <Heart className="h-3 w-3 fill-current" />
              {count} interested
            </span>
          )}
        </div>

        <h2 className="mt-2 text-xl font-extrabold leading-snug text-black">
          {event.title}
        </h2>

        {event.location && (
          <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-600">
            <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
            {event.location}
          </div>
        )}

        {event.description && (
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-700">
            {event.description}
          </p>
        )}

        <div className="mt-5 flex flex-col gap-2.5 pt-1 sm:flex-row sm:items-center">
          {expressedInterest ? (
            <span className="inline-flex items-center justify-center gap-1.5 rounded-full bg-sky-100 px-5 py-2.5 text-sm font-semibold text-sky-600">
              <Check className="h-4 w-4" strokeWidth={3} />
              Interested
            </span>
          ) : (
            <button
              type="button"
              onClick={handleExpressInterest}
              className={primaryBtn}
            >
              <Heart className="h-4 w-4" />
              Express Interest
            </button>
          )}
          <button
            type="button"
            onClick={handleAddToCalendar}
            className={outlineBtn}
          >
            <Calendar className="h-4 w-4" />
            Add to Calendar
          </button>
          {event.link && (
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className={outlineBtn}
            >
              <ExternalLink className="h-4 w-4" />
              View Details
            </a>
          )}
        </div>
      </div>
    </li>
  );
}
