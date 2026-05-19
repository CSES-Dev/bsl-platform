"use client";

import { useState } from "react";
import { Search, Rocket, Building2, Users } from "lucide-react";
import GalleryCard from "@/components/ui/GalleryCard";
import EmptyState from "@/components/ui/EmptyState";

export type GalleryItem = {
  name: string;
  description: string;
  websiteUrl?: string;
  submitterEmail?: string;
};

export type GalleryIconType = "startup" | "organization" | "team";

const iconConfig = {
  startup: { icon: Rocket, title: "No Startups Yet", description: "Be the first to showcase your startup! Apply now to join our community." },
  organization: { icon: Building2, title: "No Organizations Yet", description: "Be the first to showcase your organization! Apply now to join our community." },
  team: { icon: Users, title: "No Teams Yet", description: "Be the first to showcase your team! Apply now to join our community." },
};

type GalleryGridProps = {
  items: GalleryItem[];
  applyHref: string;
  iconType?: GalleryIconType;
};

export default function GalleryGrid({
  items,
  applyHref,
  iconType = "startup",
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
        <EmptyState
          icon={iconConfig[iconType].icon}
          title={iconConfig[iconType].title}
          description={iconConfig[iconType].description}
        />
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
