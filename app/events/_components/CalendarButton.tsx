"use client";

import { Button } from "@/components/ui/button";
import { googleCalendarUrl } from "@/lib/calendar";

interface CalendarButtonProps {
  event: {
    title: string;
    description: string | null;
    startAt: Date;
    endAt: Date | null;
    location: string | null;
  };
}

export function CalendarButton({ event }: CalendarButtonProps) {
  function handleClick() {
    const url = googleCalendarUrl(event);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <Button type="button" variant="outline" size="sm" onClick={handleClick}>
      Add to Calendar
    </Button>
  );
}
