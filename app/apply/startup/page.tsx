"use client";

import { useState } from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type StartupFormState = {
  name: string;
  description: string;
  deckUrl: string;
  fundingGoal: string;
  fundingSiteUrl: string;
  contact: string;
};

export default function StartupApplyPage() {
  const [form, setForm] = useState<StartupFormState>({
    name: "",
    description: "",
    deckUrl: "",
    fundingGoal: "",
    fundingSiteUrl: "",
    contact: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function updateField<K extends keyof StartupFormState>(key: K, value: StartupFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/applications/startup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          StartupName : form.name,
          StartupDescription : form.description,
          StartupFundingGoal : form.fundingGoal,
          StartupDeckUrl : form.deckUrl,
          StartupFundingSiteUrl : form.fundingSiteUrl,
          StartupContact : { email: form.contact, name: form.name },
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to submit application");
      }
      setStatus("success");
      setForm({
        name: "",
        description: "",
        deckUrl: "",
        fundingGoal: "",
        fundingSiteUrl: "",
        contact: "",
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
      <div className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-3xl font-semibold">Startup Application</h1>
        <p className="mt-2 text-gray-600">
          Tell us more about your startup!
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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
          
          <div className="space-y-2">
            <Label htmlFor="name">Startup name</Label>
            <Input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Your startup name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Tell us more about your startup!</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              rows={5}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deckUrl">Link to pitch deck</Label>
            <Input
              id="deckUrl"
              type="url"
              value={form.deckUrl}
              onChange={(e) => updateField("deckUrl", e.target.value)}
              placeholder="https://example.com/pitch-deck"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fundingGoal">Funding goal ($)</Label>
            <Input
              id="fundingGoal"
              type="text"
              value={form.fundingGoal}
              onChange={(e) => updateField("fundingGoal", e.target.value)}
              placeholder="100,000,000"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fundingSiteUrl">Link to external funding site</Label>
            <Input
              id="fundingSiteUrl"
              type="url"
              value={form.fundingSiteUrl}
              onChange={(e) => updateField("fundingSiteUrl", e.target.value)}
              placeholder="https://example.com/funding"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contact email</Label>
            <Input
              id="contact"
              type="email"
              value={form.contact}
              onChange={(e) => updateField("contact", e.target.value)}
              placeholder="founder@startup.com"
              required
            />
          </div>

          <div className="flex justify-center pt-4">
            <Button type="submit" disabled={loading}>Apply</Button>
          </div>
        </form>
      </div>
    </PublicLayout>
  );
}
