import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";

type GalleryPageLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export default function GalleryPageLayout({
  title,
  children,
}: GalleryPageLayoutProps) {
  return (
    <PublicLayout>
      <div className="relative min-h-screen overflow-hidden bg-white">
        {/* Decorative circle (left & right)*/}
        <div className="pointer-events-none absolute -left-32 top-40 h-80 w-80 rounded-full bg-red-200 opacity-30" />
        <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-red-200 opacity-30" />

        <div className="relative mx-auto max-w-screen-2xl py-16">
          {/* Title with blue underline */}
          <div className="mb-10 px-20">
            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
              {(() => {
                const joinIdx = title.indexOf("Join");
                if (joinIdx < 0) return <span>{title}</span>;
                const before = title.slice(0, joinIdx);
                const after = title.slice(joinIdx);
                return (
                  <>
                    {before}
                    <span className="relative inline-block">
                      {after}
                      <span className="absolute left-0 -bottom-2 h-1 w-full rounded-full bg-blue-500 block" />
                    </span>
                  </>
                );
              })()}
            </h1>
          </div>

          <div className="px-10">
            {children}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
