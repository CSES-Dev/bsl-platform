"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/admin");
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div
        style={{
          background: "#dff0f5",
          borderRadius: "20px",
          padding: "48px 40px",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#111",
            marginBottom: "8px",
          }}
        >
          Admin Login
        </h1>

        <p style={{ fontSize: "14px", color: "#555", marginBottom: "28px" }}>
          Sign in to access the dashboard
        </p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/admin" })}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            width: "100%",
            padding: "12px",
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
          <img
            src="https://api.iconify.design/logos:google-icon.svg"
            width={22}
            height={22}
            alt="Google"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
