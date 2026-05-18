"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import GalleryCard from "@/components/ui/GalleryCard";

export type GalleryItem = {
  name: string;
  description: string;
  websiteUrl?: string;
  submitterEmail?: string;
};

type GalleryGridProps = {
  items: GalleryItem[];
  applyHref: string;
  emptyMessage?: string;
};

export default function GalleryGrid({
  items,
  applyHref,
  emptyMessage = "No entries yet.",
}: GalleryGridProps) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? items.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      )
    : items;

  return (
    <div>
      {/* Search row */}
      <div className="mb-10 mx-10 flex items-stretch gap-3 rounded-2xl bg-white px-4 py-3 shadow-md">
        <div className="flex flex-1 items-center gap-3 rounded-xl bg-gray-100 px-4 py-2.5">
          <Search className="h-5 w-5 shrink-0 text-gray-400" />
          <input
            className="flex-1 bg-transparent text-base outline-none placeholder:text-gray-400"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">{emptyMessage}</p>
      ) : (
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {filtered.map((item, i) => (
            <GalleryCard
              key={i}
              name={item.name}
              description={item.description}
              websiteUrl={item.websiteUrl}
              submitterEmail={item.submitterEmail}
              applyHref={applyHref}
            />
          ))}
        </div>
      )}
    </div>
  );
}
