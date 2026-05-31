"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
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

  return (
    <li className="flex flex-col rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-[13px] uppercase tracking-[0.12em] text-sky-400">
          <span className="font-bold">{datePart}</span>
          <span className="mx-1.5 font-medium opacity-70">·</span>
          <span className="font-medium">{timePart}</span>
        </div>
        <span
          aria-live="polite"
          className={
            count > 0
              ? "inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
              : "sr-only"
          }
        >
          {count > 0 ? `${count} interested` : ""}
        </span>
      </div>

      <h2 className="mt-2 text-lg font-semibold leading-snug text-slate-900 md:text-xl">
        {event.link ? (
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 hover:underline hover:decoration-[1.5px] hover:underline-offset-[3px]"
          >
            {event.title}
          </a>
        ) : (
          event.title
        )}
      </h2>

      {event.location && (
        <div className="mt-2 text-sm text-gray-600">{event.location}</div>
      )}

      {event.description && (
        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-700">
          {event.description}
        </p>
      )}

      <div className="mt-auto flex flex-col gap-2 pt-5 md:flex-row md:items-center md:justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddToCalendar}
          className="w-full md:w-auto"
        >
          Add to Calendar
        </Button>
        {!expressedInterest && (
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={handleExpressInterest}
            className="w-full md:w-auto"
          >
            Express Interest
          </Button>
        )}
      </div>
    </li>
  );
}
