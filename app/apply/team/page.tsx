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
      <Card className="mx-auto max-w-2xl px-6 py-12">
        <CardContent>
          <h1 className="text-3xl font-semibold">Team Application</h1>
          <p className="mt-2 text-gray-600">Tell us about your team!</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Tell us about your team's background, experience, and what you're looking to work on"
                rows={5}
                required
              />
            </div>
            <div className="flex justify-center pt-4">
              <Button type="submit">Apply</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </PublicLayout>
  );
}
