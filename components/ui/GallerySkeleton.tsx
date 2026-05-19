function SkeletonCard() {
  return (
    <div className="flex flex-col rounded-3xl bg-[#D3EFFA] px-7 py-6">
      {/* Skeleton image circle */}
      <div className="mt-5 mb-4 mx-auto flex w-[75%] aspect-square items-center justify-center rounded-full bg-gray-200/60 animate-pulse" />

      <div className="pl-4 pb-4">
        {/* Skeleton title */}
        <div className="mb-3 h-8 w-3/4 rounded-lg bg-gray-200/60 animate-pulse" />

        {/* Skeleton description lines */}
        <div className="mb-2 h-5 w-full rounded bg-gray-200/60 animate-pulse" />
        <div className="mb-5 h-5 w-2/3 rounded bg-gray-200/60 animate-pulse" />

        {/* Skeleton button */}
        <div className="h-12 w-36 rounded-full bg-gray-200/60 animate-pulse" />
      </div>
    </div>
  );
}

export default function GallerySkeleton() {
  return (
    <div>
      {/* Skeleton search bar */}
      <div className="mb-10 mx-10 flex items-stretch gap-3 rounded-2xl bg-white px-4 py-3 shadow-md">
        <div className="flex flex-1 items-center gap-3 rounded-xl bg-gray-100 px-4 py-2.5">
          <div className="h-5 w-5 shrink-0 rounded bg-gray-200/60 animate-pulse" />
          <div className="h-5 flex-1 rounded bg-gray-200/60 animate-pulse" />
        </div>
      </div>

      {/* Skeleton grid */}
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
