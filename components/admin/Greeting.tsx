"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Greeting() {
  const { data: session } = useSession();
  const [text, setText] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    const timeOfDay =
      hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";
    const date = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const firstName = session?.user?.name?.split(" ")[0] ?? "there";
    setText(`Good ${timeOfDay}, ${firstName}. Here's what's happening across BSL today · ${date}`);
  }, [session?.user?.name]);

  if (!text) return null;

  return <p className="text-gray-500">{text}</p>;
}
