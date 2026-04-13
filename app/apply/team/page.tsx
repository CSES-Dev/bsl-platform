"use client";

import { useState } from "react";
import PublicLayout from "@/components/layout/PublicLayout";

type TeamFormState = {
  submitterName: string;
  submitterEmail: string;
  teamName: string;
  skills: string;
  teamSize: string;
  projectPreferences: string; // kinds of projects they want — e.g. "web apps, AI tools"
  description: string;
};

export default function TeamApplicationPage() {
  const [form, setForm] = useState<TeamFormState>({
    submitterEmail: "",
    submitterName: "",
    teamName: "",
    skills: "",
    teamSize: "",
    projectPreferences: "",
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
              placeholder="e.g. squad"
              required
            />
          </div>

          {/* Team Size */}
          <div className="space-y-2">
            <label className="block font-medium" htmlFor="teamSize">
              Team Size
            </label>
            <input
              id="teamSize"
              type="number"
              min="1"
              value={form.projectPreferences}
              onChange={(e) =>
                updateField("projectPreferences", e.target.value)
              }
              className="w-full rounded-md border px-3 py-2"
              placeholder="e.g., 4"
              required
            />
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <label className="block font-medium" htmlFor="skills">
              Skills & Technologies
            </label>
            <input
              id="skills"
              type="text"
              value={form.skills}
              onChange={(e) => updateField("skills", e.target.value)}
              className="w-full rounded-md border px-3 py-2"
              placeholder="e.g., React, Node.js, Figma, Python"
              required
            />
          </div>

          {/* Project Preferences */}
          <div className="space-y-2">
            <label className="block font-medium" htmlFor="projectPreferences">
              Project Preferences
            </label>
            <input
              id="projectPreferences"
              type="text"
              value={form.projectPreferences}
              onChange={(e) => updateField("teamSize", e.target.value)}
              className="w-full rounded-md border px-3 py-2"
              placeholder="e.g., Web apps, AI/ML tools, non-profit work"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block font-medium" htmlFor="description">
              About Your Team
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              className="w-full rounded-md border px-3 py-2"
              placeholder="Tell us about your team's background, experience, and what you're looking to work on"
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
