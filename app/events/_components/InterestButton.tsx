"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface InterestButtonProps {
  eventId: string;
  initialCount: number;
}

export function InterestButton({ eventId, initialCount }: InterestButtonProps) {
  const [count, setCount] = useState(initialCount);
  const [disabled, setDisabled] = useState(false);

  async function handleClick() {
    // Optimistic update.
    setCount((c) => c + 1);
    setDisabled(true);

    try {
      const res = await fetch(`/api/events/${eventId}/interest`, {
        method: "POST",
      });

      if (!res.ok) {
        // 409 = cookie says this browser already counted; keep
        // disabled but roll the optimistic count back to initial.
        // Any other non-2xx is a real failure: roll back and re-enable.
        if (res.status === 409) {
          setCount(initialCount);
        } else {
          setCount(initialCount);
          setDisabled(false);
        }
      }
    } catch {
      // Network error — roll back and re-enable so the user can retry.
      setCount(initialCount);
      setDisabled(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        type="button"
        variant="default"
        size="sm"
        onClick={handleClick}
        disabled={disabled}
      >
        Express Interest
      </Button>
      <span className="text-sm text-gray-600">{count} interested</span>
    </div>
  );
}
