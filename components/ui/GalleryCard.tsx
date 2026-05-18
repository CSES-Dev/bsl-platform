import Image from "next/image";

type GalleryCardProps = {
  name: string;
  description: string;
  websiteUrl?: string;
  submitterEmail?: string;
  applyHref: string;
};

export default function GalleryCard({
  name,
  description,
  websiteUrl,
  submitterEmail,
}: GalleryCardProps) {
  return (
    <div className="flex flex-col rounded-3xl bg-[#D3EFFA] px-7 py-6 transition-shadow hover:shadow-md">
      {/* Rocket circle */}
      <div className="mt-5 mb-4 mx-auto flex w-[75%] aspect-square items-center justify-center rounded-full bg-[#e8f6fd]">
        <Image src="/gallery-rocket.png" alt="Rocket" width={120} height={120} />
      </div>

      <div className="pl-4 pb-4">
        <h3 className="mb-3 text-3xl font-bold text-gray-900">{name}</h3>

        <p className="mb-5 flex-1 text-lg text-gray-700 leading-relaxed">
          {description}
        </p>

        <div className="mt-auto flex justify-start">
          {websiteUrl ? (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-12 py-4 text-base font-bold text-gray-900 underline shadow-sm hover:bg-gray-50 transition-colors"
            >
              Visit Website
            </a>
          ) : submitterEmail ? (
            <a
              href={`mailto:${submitterEmail}`}
              className="rounded-full bg-white px-12 py-4 text-base font-bold text-gray-900 underline shadow-sm hover:bg-gray-50 transition-colors"
            >
              Contact
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
