"use client";

import { useState } from "react";

type TeamFormState = {
  submitterName: string;
  submitterEmail: string;
  teamName: string;
  skills: string;
  teamSize: string;
  projectPreferences: string;
  description: string;
};

interface FormProps {
  onSuccess?: () => void;
}

export default function TeamForm({ onSuccess }: FormProps) {
  const [form, setForm] = useState<TeamFormState>({
    submitterEmail: "",
    submitterName: "",
    teamName: "",
    skills: "",
    teamSize: "",
    projectPreferences: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  function updateField<K extends keyof TeamFormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitAttempted(true);

    if (Object.values(form).some((val) => !val.trim())) {
      return;
    }

    setLoading(true);
    setStatus("idle");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/applications/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Failed to submit application");
      }

      setStatus("success");
      setSubmitAttempted(false);
      setForm({
        submitterEmail: "",
        submitterName: "",
        teamName: "",
        skills: "",
        teamSize: "",
        projectPreferences: "",
        description: "",
      });

      if (onSuccess) {
        setTimeout(onSuccess, 1500);
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  }

  const baseInputStyles =
    "w-full px-4 py-2 bg-white border text-sm transition-colors focus:outline-none focus:ring-2";
  const pillStyles = `${baseInputStyles} rounded-full`;
  const textareaStyles = `${baseInputStyles} rounded-3xl resize-none`;

  const getInputStateClasses = (value: string) => {
    if (submitAttempted && !value.trim()) {
      return "border-rose-400 focus:ring-rose-400 focus:border-rose-400";
    }
    return "border-sky-300 focus:ring-[#65c2e8] focus:border-[#65c2e8]";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 flex flex-col"
      noValidate
    >
      {status === "success" && (
        <div className="rounded-2xl bg-green-50 p-4 text-sm text-green-700 text-center font-medium mb-4">
          Application submitted successfully!
        </div>
      )}
      {status === "error" && (
        <div className="rounded-2xl bg-rose-50 p-4 text-sm text-rose-600 text-center font-medium mb-4">
          {errorMessage || "Failed to submit application. Please try again."}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="submitterName" className="text-sm text-gray-700 ml-2">
            Submitter Name
          </label>
          <input
            id="submitterName"
            value={form.submitterName}
            onChange={(e) => updateField("submitterName", e.target.value)}
            placeholder="Your full name"
            className={`${pillStyles} ${getInputStateClasses(form.submitterName)}`}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="submitterEmail"
            className="text-sm text-gray-700 ml-2"
          >
            Submitter Email
          </label>
          <input
            id="submitterEmail"
            type="email"
            value={form.submitterEmail}
            onChange={(e) => updateField("submitterEmail", e.target.value)}
            placeholder="you@example.com"
            className={`${pillStyles} ${getInputStateClasses(form.submitterEmail)}`}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="teamName" className="text-sm text-gray-700 ml-2">
            Team Name
          </label>
          <input
            id="teamName"
            value={form.teamName}
            onChange={(e) => updateField("teamName", e.target.value)}
            placeholder="Your team name"
            className={`${pillStyles} ${getInputStateClasses(form.teamName)}`}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="teamSize" className="text-sm text-gray-700 ml-2">
            Team Size
          </label>
          <input
            id="teamSize"
            type="number"
            min="1"
            value={form.teamSize}
            onChange={(e) => updateField("teamSize", e.target.value)}
            placeholder="e.g., 4"
            className={`${pillStyles} ${getInputStateClasses(form.teamSize)}`}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="skills" className="text-sm text-gray-700 ml-2">
          Skills & Technologies
        </label>
        <input
          id="skills"
          value={form.skills}
          onChange={(e) => updateField("skills", e.target.value)}
          placeholder="e.g., React, Node.js, Figma"
          className={`${pillStyles} ${getInputStateClasses(form.skills)}`}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="projectPreferences"
          className="text-sm text-gray-700 ml-2"
        >
          Project Preferences
        </label>
        <input
          id="projectPreferences"
          value={form.projectPreferences}
          onChange={(e) => updateField("projectPreferences", e.target.value)}
          placeholder="e.g., Web apps, AI/ML tools"
          className={`${pillStyles} ${getInputStateClasses(form.projectPreferences)}`}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm text-gray-700 ml-2">
          About Your Team
        </label>
        <textarea
          id="description"
          rows={4}
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Tell us about your team's background..."
          className={`${textareaStyles} ${getInputStateClasses(form.description)}`}
          required
        />
      </div>

      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#f26666] hover:bg-[#e55555] text-white font-bold tracking-wider py-2 px-10 rounded-full border-2 border-white ring-2 ring-[#f26666] shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase"
        >
          {loading ? "Submitting..." : "Apply"}
        </button>
      </div>
    </form>
  );
}
