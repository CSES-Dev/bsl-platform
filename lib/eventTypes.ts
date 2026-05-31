export const EVENT_TYPES = [
    "Roundtable",
    "Pitch",
    "Demo Day",
    "Conference",
    "Other",
  ] as const;
  
  export type EventType = (typeof EVENT_TYPES)[number];