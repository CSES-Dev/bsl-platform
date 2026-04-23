"use client";

import { useState } from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type ProjectFormState = {
  submitterName: string;
  submitterEmail: string;
  skillsNeeded: string;
  companyName: string;
  projectTitle: string;
  budget: string;
  description: string;
};

export default function CompanyProjectPage() {
  const [form, setForm] = useState<ProjectFormState>({
    submitterEmail: "",
    submitterName: "",
    skillsNeeded: "",
    companyName: "",
    projectTitle: "",
    budget: "",
    description: "",
  });

  function updateField<K extends keyof ProjectFormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Submitting Company Project:", form);
  }

  return (
    <PublicLayout>
      <div className="mx-auto max-w-2xl px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">New Company Project</h1>
          <p className="mt-2 text-gray-600">
            Submit your project proposal for review. All fields are required.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="submitterName">Submitter Name</Label>
            <Input
              id="submitterName"
              required
              value={form.submitterName}
              onChange={(e) => updateField("submitterName", e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="submitterEmail">Submitter Email</Label>
            <Input
              id="submitterEmail"
              type="email"
              required
              value={form.submitterEmail}
              onChange={(e) => updateField("submitterEmail", e.target.value)}
              placeholder="Your email"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="companyName">Company / Organization Name</Label>
            <Input
              id="companyName"
              required
              value={form.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
              placeholder="Your company name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="projectTitle">Project Title</Label>
            <Input
              id="projectTitle"
              required
              value={form.projectTitle}
              onChange={(e) => updateField("projectTitle", e.target.value)}
              placeholder="Your project title"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="budget">Estimated Budget</Label>
            <Input
              id="budget"
              required
              value={form.budget}
              onChange={(e) => updateField("budget", e.target.value)}
              placeholder="e.g. $25,000"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="skillsNeeded">Skills / Expertise Needed</Label>
            <Input
              id="skillsNeeded"
              required
              value={form.skillsNeeded}
              onChange={(e) => updateField("skillsNeeded", e.target.value)}
              placeholder="e.g. React, Node.js, UI/UX Design"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Project Description</Label>
            <Textarea
              id="description"
              required
              rows={4}
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Outline the main objectives and deliverables..."
            />
          </div>

          <div className="flex justify-center pt-4">
            <Button type="submit">Apply</Button>
          </div>
        </form>
      </div>
    </PublicLayout>
  );
}