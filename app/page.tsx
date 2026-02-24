import PublicLayout from "@/components/layout/PublicLayout";
import { currentUserRole, isAdmin, isAuthenticated } from "@/lib/mock-auth";
import Link from "next/link";

export default function Page() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-4xl font-semibold tracking-tight">Home</h1>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">Our mission is ...</p>
        </section>

        <p className="mt-6 text-sm text-gray-600">
          Current role: <span className="font-semibold">{currentUserRole}</span>
        </p>

        <div className="mt-4 flex gap-2">
          {isAuthenticated() && (
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              User Action
            </button>
          )}
          {isAdmin() && (
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Admin Only
            </button>
          )}
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Public Action
          </button>
        </div>
      </div>
    </PublicLayout>
  );
}