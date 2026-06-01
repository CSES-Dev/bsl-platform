/**
 * Builds a Google Calendar "render" URL that pre-fills a new event
 * with the given event details. Opens the standard Google Calendar
 * "create event" UI in the user's logged-in calendar.
 *
 * Date format expected by Google Calendar's `dates` param is the
 * basic-ISO UTC form: `YYYYMMDDTHHmmssZ/YYYYMMDDTHHmmssZ`.
 *
 * When `endAt` is null, defaults the end to start + 60 minutes so
 * the calendar entry has a sensible duration.
 */
export function googleCalendarUrl(event: {
  title: string;
  description: string | null;
  startAt: Date;
  endAt: Date | null;
  location: string | null;
}): string {
  const start = event.startAt;
  const end = event.endAt ?? new Date(start.getTime() + 60 * 60 * 1000);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${formatCalendarDate(start)}/${formatCalendarDate(end)}`,
  });

  if (event.description) {
    params.set("details", event.description);
  }
  if (event.location) {
    params.set("location", event.location);
  }

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function formatCalendarDate(date: Date): string {
  // YYYYMMDDTHHmmssZ — strip dashes, colons, and milliseconds from
  // the ISO-8601 string.
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}
