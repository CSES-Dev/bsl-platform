"use client";

import { useState } from "react";
import { Search, ChevronDown, Image as ImageIcon } from "lucide-react";
import GalleryCard from "@/components/ui/GalleryCard";

export type GalleryItem = {
  name: string;
  description: string;
  websiteUrl?: string;
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
      {/* Search + Filter row */}
      <div className="mb-10 mx-10 flex items-stretch gap-3 rounded-2xl bg-white px-4 py-3 shadow-md">
        {/* Search input */}
        <div className="flex flex-[2] items-center gap-3 rounded-xl bg-gray-100 px-4 py-2.5">
          <Search className="h-5 w-5 shrink-0 text-gray-400" />
          <input
            className="flex-1 bg-transparent text-base outline-none placeholder:text-gray-400"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Filter pill */}
        <div className="flex flex-[1] items-center gap-3 rounded-xl bg-gray-100 px-4 py-2.5 cursor-pointer select-none">
          <ImageIcon className="h-5 w-5 text-gray-400" />
          <span className="flex-1 text-base text-gray-400">Filter</span>
          <ChevronDown className="h-4 w-4 text-gray-400" />
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
              applyHref={applyHref}
            />
          ))}
        </div>
      )}
    </div>
  );
}
