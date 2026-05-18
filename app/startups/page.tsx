import { prisma } from "@/lib/prisma";
import GalleryPageLayout from "@/components/ui/GalleryPageLayout";
import GalleryGrid from "@/components/ui/GalleryGrid";

export default async function StartupsPage() {
  const applications = await prisma.application.findMany({
    where: { type: "startup", status: "approved" },
  });

  const items = applications.map((app) => {
    const payload = app.payload as Record<string, unknown>;
    return {
      name: (payload.name as string) ?? "Untitled",
      description: (payload.description as string) ?? "",
      websiteUrl: (payload.websiteUrl as string | undefined) ?? undefined,
      submitterEmail: app.submitterEmail ?? undefined,
    };
  });

  return (
    <GalleryPageLayout title="Apply to Join Startups" highlightFrom="Join">
      <GalleryGrid
        items={items}
        applyHref="/apply/startup"
        emptyMessage="No approved startups yet. Check back soon!"
      />
    </GalleryPageLayout>
  );
}
