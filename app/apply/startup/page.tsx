"use client";

import { useState } from "react";
import PublicLayout from "@/components/layout/PublicLayout";

type StartupFormState = {
  name: string;
  description: string;
  fundingGoal: string;
  contact: string;
};

export default function StartupApplyPage() {
  const [form, setForm] = useState<StartupFormState>({
    name: "",
    description: "",
    fundingGoal: "",
    contact: "",
  });

  function updateField<K extends keyof StartupFormState>(key: K, value: StartupFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Startup application form:", form);
  }

  return (
    <PublicLayout>
      <div className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-3xl font-semibold">Startup Application</h1>
        <p className="mt-2 text-gray-600">
          UI only for now — submitting will log your inputs to the console.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-2">
                <label className="block font-medium" htmlFor="name">
                Startup Name
                </label>
                <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full rounded-md border px-3 py-2"
                placeholder="e.g., Startup Labs"
                required
                />
            </div>

            <div className="space-y-2">
                <label className="block font-medium" htmlFor="description">
                Description
                </label>
                <textarea
                id="description"
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                className="w-full rounded-md border px-3 py-2"
                placeholder="What does your startup do?"
                rows={5}
                required
                />
            </div>

            <div className="space-y-2">
                <label className="block font-medium" htmlFor="fundingGoal">
                Funding Goal
                </label>
                <input
                id="fundingGoal"
                type="text"
                value={form.fundingGoal}
                onChange={(e) => updateField("fundingGoal", e.target.value)}
                className="w-full rounded-md border px-3 py-2"
                placeholder="e.g., $50,000"
                required
                />
            </div>

            <div className="space-y-2">
                <label className="block font-medium" htmlFor="contact">
                Contact (email or phone)
                </label>
                <input
                id="contact"
                type="text"
                value={form.contact}
                onChange={(e) => updateField("contact", e.target.value)}
                className="w-full rounded-md border px-3 py-2"
                placeholder="you@company.com"
                required
                />
            </div>

            <button
                type="submit"
                className="rounded-md border px-4 py-2 font-medium hover:bg-gray-50"
            >
                Submit
            </button>
            </form>
      </div>
    </PublicLayout>
  );
}

