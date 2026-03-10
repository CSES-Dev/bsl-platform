"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

export default function ProfileDropdown() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {session?.user?.image && (
        <img
          src={session.user.image}
          referrerPolicy="no-referrer"
          alt={session.user.name ?? "Profile"}
          width={44}
          height={44}
          onClick={() => setOpen(!open)}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            cursor: "pointer",
            border: open ? "2px solid #111" : "2px solid transparent",
            transition: "border 0.15s",
          }}
        />
      )}

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "52px",
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "8px",
            minWidth: "220px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            zIndex: 50,
          }}
        >
          <div
            style={{
              padding: "8px 12px 12px",
              borderBottom: "1px solid #f0f0f0",
              marginBottom: "8px",
            }}
          >
            <p style={{ fontSize: "20px", fontWeight: "700", color: "#111" }}>
              {session?.user?.name}
            </p>
            <p style={{ fontSize: "16px", color: "#888", marginTop: "2px" }}>
              {session?.user?.email}
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            style={{
              width: "100%",
              padding: "9px 12px",
              background: "#111",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
