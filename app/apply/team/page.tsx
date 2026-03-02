"use client";

import { useState } from "react";
import PublicLayout from "@/components/layout/PublicLayout";

type TeamFormState = {
  teamName: string;
  projectTitle: string;
  budget: string;
  description: string;
};

export default function TeamApplicationPage() {
  const [form, setForm] = useState<TeamFormState>({
    teamName: "",
    projectTitle: "",
    budget: "",
    description: "",
  });

  function updateField<K extends keyof TeamFormState>(
    key: K,
    value: TeamFormState[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Team application form:", form);
  }

  return (
    <PublicLayout>
      <div className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-3xl font-semibold">Team Application</h1>
        <p className="mt-2 text-gray-600">
          UI only for now — submitting will log your inputs to the console.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Team Name */}
          <div className="space-y-2">
            <label className="block font-medium" htmlFor="teamName">
              Team Name
            </label>
            <input
              id="teamName"
              type="text"
              value={form.teamName}
              onChange={(e) => updateField("teamName", e.target.value)}
              className="w-full rounded-md border px-3 py-2"
              placeholder="e.g., Alpha Squad"
              required
            />
          </div>

          {/* Project Title */}
          <div className="space-y-2">
            <label className="block font-medium" htmlFor="projectTitle">
              Project Title
            </label>
            <input
              id="projectTitle"
              type="text"
              value={form.projectTitle}
              onChange={(e) => updateField("projectTitle", e.target.value)}
              className="w-full rounded-md border px-3 py-2"
              placeholder="e.g., AI Research Dashboard"
              required
            />
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <label className="block font-medium" htmlFor="budget">
              Estimated Budget
            </label>
            <input
              id="budget"
              type="text"
              value={form.budget}
              onChange={(e) => updateField("budget", e.target.value)}
              className="w-full rounded-md border px-3 py-2"
              placeholder="e.g., $25,000"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block font-medium" htmlFor="description">
              Project Description
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              className="w-full rounded-md border px-3 py-2"
              placeholder="Outline your project objectives and deliverables"
              rows={5}
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
