"use client";

import { useState } from "react";

type StartupFormState = {
  submitterName: string;
  submitterEmail: string;
  name: string;
  description: string;
  deckUrl: string;
  fundingGoal: string;
  fundingSiteUrl: string;
};

interface FormProps {
  onSuccess?: () => void;
}

export default function StartupForm({ onSuccess }: FormProps) {
  const [form, setForm] = useState<StartupFormState>({
    submitterName: "",
    submitterEmail: "",
    name: "",
    description: "",
    deckUrl: "",
    fundingGoal: "",
    fundingSiteUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitAttempted, setSubmitAttempted] = useState(false);

  function updateField<K extends keyof StartupFormState>(
    key: K,
    value: string,
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitAttempted(true);

    // Standardized check matching the OrgForm style (ignoring the optional fundingSiteUrl)
    if (
      Object.entries(form).some(
        ([key, val]) => key !== "fundingSiteUrl" && !val.trim()
      )
    ) {
      return;
    }

    setLoading(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/applications/startup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          StartupName: form.name,
          StartupDescription: form.description,
          StartupFundingGoal: form.fundingGoal,
          StartupDeckUrl: form.deckUrl,
          StartupFundingSiteUrl: form.fundingSiteUrl,
          submitterName: form.submitterName,
          submitterEmail: form.submitterEmail,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit application");
      }

      setStatus("success");
      setSubmitAttempted(false);
      setForm({
        submitterEmail: "",
        submitterName: "",
        name: "",
        description: "",
        deckUrl: "",
        fundingGoal: "",
        fundingSiteUrl: "",
      });

      if (onSuccess) {
        setTimeout(onSuccess, 1500);
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  const baseInputStyles =
    "w-full px-4 py-2 bg-white border text-sm transition-colors focus:outline-none focus:ring-2";
  const pillStyles = `${baseInputStyles} rounded-full`;
  const textareaStyles = `${baseInputStyles} rounded-3xl resize-none`;

  // Adjusted to match OrgForm's single-argument structure exactly
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
          Failed to submit application. Please try again.
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
        <label htmlFor="name" className="text-sm text-gray-700 ml-2">
          Startup Name
        </label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="Your startup name"
          className={`${pillStyles} ${getInputStateClasses(form.name)}`}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm text-gray-700 ml-2">
          Tell us more about your startup!
        </label>
        <textarea
          id="description"
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Outline the main objectives and deliverables..."
          rows={4}
          className={`${textareaStyles} ${getInputStateClasses(form.description)}`}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="deckUrl" className="text-sm text-gray-700 ml-2">
          Link to pitch deck
        </label>
        <input
          id="deckUrl"
          type="url"
          value={form.deckUrl}
          onChange={(e) => updateField("deckUrl", e.target.value)}
          placeholder="https://example.com/pitch-deck"
          className={`${pillStyles} ${getInputStateClasses(form.deckUrl)}`}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="fundingGoal" className="text-sm text-gray-700 ml-2">
          Funding goal ($)
        </label>
        <input
          id="fundingGoal"
          type="text"
          value={form.fundingGoal}
          onChange={(e) => updateField("fundingGoal", e.target.value)}
          placeholder="100,000,000"
          className={`${pillStyles} ${getInputStateClasses(form.fundingGoal)}`}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="fundingSiteUrl" className="text-sm text-gray-700 ml-2">
          Link to external funding site
        </label>
        <input
          id="fundingSiteUrl"
          type="url"
          value={form.fundingSiteUrl}
          onChange={(e) => updateField("fundingSiteUrl", e.target.value)}
          placeholder="https://example.com/funding"
          className={`${pillStyles} ${getInputStateClasses(form.fundingSiteUrl)}`}
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
