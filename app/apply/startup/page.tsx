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
  fundingGoal: string;
  contact: string;
};

export default function StartupApplyPage() {
  const [form, setForm] = useState<StartupFormState>({
    name: "",
    description: "",
    fundingGoal: "",
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
          StartupContact : form.contact,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to submit application");
      }
      setStatus("success");
      setForm({
        name: "",
        description: "",
        fundingGoal: "",
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
            <Label htmlFor="name">Link to pitch deck</Label>
            <Input
              id="name"
              type="url"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Loremipsumdolorsitamet.com"
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
            <Label htmlFor="contact">Link to external funding site</Label>
            <Input
              id="contact"
              type="url"
              value={form.contact}
              onChange={(e) => updateField("contact", e.target.value)}
              placeholder="Loremipsumdolorsitamet.com"
              required
            />
          </div>

          <div className="flex flex-col items-center gap-3 pt-4">
  {status === "success" && (
    <p className="text-green-600 font-medium">Application submitted successfully!</p>
  )}
  {status === "error" && (
    <p className="text-red-600 font-medium">Something went wrong. Please try again.</p>
  )}
  <Button type="submit" disabled={loading}>
    {loading ? "Submitting..." : "Apply"}
  </Button>
</div>
        </form>
      </div>
    </PublicLayout>
  );
}
