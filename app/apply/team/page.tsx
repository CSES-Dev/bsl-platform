"use client";

import { useState } from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type TeamFormState = {
  submitterName: string;
  submitterEmail: string;
  teamName: string;
  skills: string;
  teamSize: string;
  projectPreferences: string;
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

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function updateField<K extends keyof TeamFormState>(
    key: K,
    value: TeamFormState[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setStatus("idle");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/applications/team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          submitterName: form.submitterName,
          submitterEmail: form.submitterEmail,
          teamName: form.teamName,
          skills: form.skills,
          teamSize: form.teamSize,
          projectPreferences: form.projectPreferences,
          description: form.description,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Failed to submit application");
      }

      setStatus("success");

      setForm({
        submitterEmail: "",
        submitterName: "",
        teamName: "",
        skills: "",
        teamSize: "",
        projectPreferences: "",
        description: "",
      });
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

  return (
    <PublicLayout>
      <Card className="mx-auto max-w-2xl px-6 py-12">
        <CardContent>
          <h1 className="text-3xl font-semibold">Team Application</h1>
          <p className="mt-2 text-gray-600">Tell us about your team!</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {status === "success" && (
              <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">
                Application submitted successfully!
              </div>
            )}

            {status === "error" && (
              <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
                {errorMessage ||
                  "Failed to submit application. Please try again."}
              </div>
            )}

            {/* Submitter Name */}
            <div className="space-y-2">
              <Label htmlFor="submitterName">Your Name</Label>
              <Input
                id="submitterName"
                type="text"
                value={form.submitterName}
                onChange={(e) => updateField("submitterName", e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>

            {/* Submitter Email */}
            <div className="space-y-2">
              <Label htmlFor="submitterEmail">Your Email</Label>
              <Input
                id="submitterEmail"
                type="email"
                value={form.submitterEmail}
                onChange={(e) => updateField("submitterEmail", e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Team Name */}
            <div className="space-y-2">
              <Label htmlFor="teamName">Team Name</Label>
              <Input
                id="teamName"
                type="text"
                value={form.teamName}
                onChange={(e) => updateField("teamName", e.target.value)}
                placeholder="Your team name"
                required
              />
            </div>

            {/* Team Size */}
            <div className="space-y-2">
              <Label htmlFor="teamSize">Team Size</Label>
              <Input
                id="teamSize"
                type="number"
                min="1"
                value={form.teamSize}
                onChange={(e) => updateField("teamSize", e.target.value)}
                placeholder="e.g., 4"
                required
              />
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <Label htmlFor="skills">Skills & Technologies</Label>
              <Input
                id="skills"
                type="text"
                value={form.skills}
                onChange={(e) => updateField("skills", e.target.value)}
                placeholder="e.g., React, Node.js, Figma, Python"
                required
              />
            </div>

            {/* Project Preferences */}
            <div className="space-y-2">
              <Label htmlFor="projectPreferences">Project Preferences</Label>
              <Input
                id="projectPreferences"
                type="text"
                value={form.projectPreferences}
                onChange={(e) =>
                  updateField("projectPreferences", e.target.value)
                }
                placeholder="e.g., Web apps, AI/ML tools, non-profit work"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">About Your Team</Label>
              <Textarea
                id="description"
                rows={5}
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Tell us about your team's background, experience, and what you're looking to work on"
                required
              />
            </div>

            <div className="flex justify-center pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Apply"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </PublicLayout>
  );
}
