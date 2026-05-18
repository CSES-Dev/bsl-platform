"use client";

import { useState } from "react";

type ProjectFormState = {
  submitterName: string;
  submitterEmail: string;
  skillsNeeded: string;
  companyName: string;
  projectTitle: string;
  budget: string;
  description: string;
  websiteUrl: string;
};

interface FormProps {
  onSuccess?: () => void;
}

export default function OrgForm({ onSuccess }: FormProps) {
  const [form, setForm] = useState<ProjectFormState>({
    submitterEmail: "",
    submitterName: "",
    skillsNeeded: "",
    companyName: "",
    projectTitle: "",
    budget: "",
    description: "",
    websiteUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  function updateField<K extends keyof ProjectFormState>(
    key: K,
    value: string,
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitAttempted(true);

    if (Object.entries(form).some(([key, val]) => key !== "websiteUrl" && !val.trim())) {
      return;
    }

    setLoading(true);
    setStatus("idle");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/applications/org", {
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
        skillsNeeded: "",
        companyName: "",
        projectTitle: "",
        budget: "",
        description: "",
        websiteUrl: "",
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
            placeholder="Submitter name"
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
            placeholder="Submitter email"
            className={`${pillStyles} ${getInputStateClasses(form.submitterEmail)}`}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="companyName" className="text-sm text-gray-700 ml-2">
          Company / Organization Name
        </label>
        <input
          id="companyName"
          value={form.companyName}
          onChange={(e) => updateField("companyName", e.target.value)}
          placeholder="Your company name"
          className={`${pillStyles} ${getInputStateClasses(form.companyName)}`}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="projectTitle" className="text-sm text-gray-700 ml-2">
          Project Title
        </label>
        <input
          id="projectTitle"
          value={form.projectTitle}
          onChange={(e) => updateField("projectTitle", e.target.value)}
          placeholder="Your project title"
          className={`${pillStyles} ${getInputStateClasses(form.projectTitle)}`}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="budget" className="text-sm text-gray-700 ml-2">
            Estimated Budget
          </label>
          <input
            id="budget"
            value={form.budget}
            onChange={(e) => updateField("budget", e.target.value)}
            placeholder="e.g. $25,000"
            className={`${pillStyles} ${getInputStateClasses(form.budget)}`}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="skillsNeeded" className="text-sm text-gray-700 ml-2">
            Skills Needed
          </label>
          <input
            id="skillsNeeded"
            value={form.skillsNeeded}
            onChange={(e) => updateField("skillsNeeded", e.target.value)}
            placeholder="e.g. React, Node.js"
            className={`${pillStyles} ${getInputStateClasses(form.skillsNeeded)}`}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm text-gray-700 ml-2">
          Project Description
        </label>
        <textarea
          id="description"
          rows={4}
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Outline the main objectives and deliverables..."
          className={`${textareaStyles} ${getInputStateClasses(form.description)}`}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="websiteUrl" className="text-sm text-gray-700 ml-2">
          Website URL <span className="text-gray-400">(optional)</span>
        </label>
        <input
          id="websiteUrl"
          type="url"
          value={form.websiteUrl}
          onChange={(e) => updateField("websiteUrl", e.target.value)}
          placeholder="https://yourcompany.com"
          className={`${pillStyles} border-sky-300 focus:ring-[#65c2e8] focus:border-[#65c2e8] focus:outline-none focus:ring-2`}
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
