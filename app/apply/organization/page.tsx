"use client";

import { useState } from "react";
import PublicLayout from "@/components/layout/PublicLayout";

type ProjectFormState = {
  companyName: string;
  projectTitle: string;
  budget: string;
  description: string;
};

export default function CompanyProjectPage() {
  const [form, setForm] = useState<ProjectFormState>({
    companyName: "",
    projectTitle: "",
    budget: "",
    description: "",
  });

  function updateField<K extends keyof ProjectFormState>(
    key: K,
    value: string,
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Submitting Company Project:", form);
    alert("Project details logged to console!");
  }

  return (
    <PublicLayout>
      <div className="mx-auto max-w-2xl px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            New Company Project
          </h1>
          <p className="mt-2 text-gray-600">
            Submit your project proposal for review. All fields are required.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Name Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="companyName" className="text-sm font-semibold">
              Company / Organization Name
            </label>
            <input
              id="companyName"
              type="text"
              required
              value={form.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Acme Corp"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Project Title Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="projectTitle" className="text-sm font-semibold">
                Project Title
              </label>
              <input
                id="projectTitle"
                type="text"
                required
                value={form.projectTitle}
                onChange={(e) => updateField("projectTitle", e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-2"
                placeholder="Internal CRM Redesign"
              />
            </div>
          </div>

          {/* Budget Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="budget" className="text-sm font-semibold">
              Estimated Budget
            </label>
            <input
              id="budget"
              type="text"
              required
              value={form.budget}
              onChange={(e) => updateField("budget", e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2"
              placeholder="e.g. $25,000"
            />
          </div>

          {/* Description Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-semibold">
              Project Description
            </label>
            <textarea
              id="description"
              required
              rows={4}
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2"
              placeholder="Outline the main objectives and deliverables..."
            />
          </div>

          {/* Form Actions */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </PublicLayout>
  );
}
