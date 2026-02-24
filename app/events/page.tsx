"use client"
import React from "react";
import PublicLayout from '@/components/layout/PublicLayout';

export default function EventsPage() {
  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-semibold mb-6">Events</h1>
        <p className="text-lg text-gray-700">No events yet — this is a placeholder page so the navbar link doesn&apos;t 404.</p>
      </div>
    </PublicLayout>
  );
}
