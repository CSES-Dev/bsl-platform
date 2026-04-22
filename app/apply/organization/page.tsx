"use client";

import { useState } from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";

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

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function updateField<K extends keyof ProjectFormState>(
    key: K,
    value: string,
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/applications/org", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: form.companyName,
          projectTitle: form.projectTitle,
          budget: form.budget,
          description: form.description,
          submitterName: form.submitterName,
          submitterEmail: form.submitterEmail,
          skillsNeeded: form.skillsNeeded,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit application");
      }

      setStatus("success");

      setForm({
        submitterEmail: "",
        submitterName: "",
        skillsNeeded: "",
        companyName: "",
        projectTitle: "",
        budget: "",
        description: "",
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PublicLayout>
      <Card className="mx-auto max-w-2xl px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            New Company Project
          </h1>
          <p className="mt-2 text-gray-600">
            Submit your project proposal for review. All fields are required.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {status === "success" && (
            <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">
              Application submitted successfully!
            </div>
          )}

          {status === "error" && (
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
              Failed to submit application. Please try again.
            </div>
          )}

          {/* Submitter Name */}
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

          {/* Submitter Email */}
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

          {/* Company Name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="companyName">Company / Organization Name</Label>
            <Input
              id="companyName"
              type="text"
              required
              value={form.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
              placeholder="Your company name"
            />
          </div>

          {/* Project Title */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="projectTitle">Project Title</Label>
            <Input
              id="projectTitle"
              type="text"
              required
              value={form.projectTitle}
              onChange={(e) => updateField("projectTitle", e.target.value)}
              placeholder="Your project title"
            />
          </div>

          {/* Budget */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="budget">Estimated Budget</Label>
            <Input
              id="budget"
              type="text"
              required
              value={form.budget}
              onChange={(e) => updateField("budget", e.target.value)}
              placeholder="e.g. $25,000"
            />
          </div>

          {/* Skills */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="skillsNeeded">Skills / Expertise Needed</Label>
            <Input
              id="skillsNeeded"
              type="text"
              required
              value={form.skillsNeeded}
              onChange={(e) => updateField("skillsNeeded", e.target.value)}
              placeholder="e.g. React, Node.js, UI/UX Design"
            />
          </div>

          {/* Description */}
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
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Apply"}
            </Button>
          </div>
        </form>
      </Card>
    </PublicLayout>
  );
}
