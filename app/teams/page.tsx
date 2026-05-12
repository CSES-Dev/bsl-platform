import { prisma } from "@/lib/prisma";
import GalleryPageLayout from "@/components/ui/GalleryPageLayout";
import GalleryGrid from "@/components/ui/GalleryGrid";

export default async function TeamsPage() {
  const applications = await prisma.application.findMany({
    where: { type: "team", status: "approved" },
  });

  const items = applications.map((app) => {
    const payload = app.payload as Record<string, unknown>;
    return {
      name: (payload.teamName as string) ?? "Untitled",
      description: (payload.description as string) ?? "",
      websiteUrl: (payload.websiteUrl as string | undefined) ?? undefined,
    };
  });

  return (
    <GalleryPageLayout title="Apply to Join Product Teams">
      <GalleryGrid
        items={items}
        applyHref="/apply/team"
        emptyMessage="No approved teams yet. Check back soon!"
      />
    </GalleryPageLayout>
  );
}
