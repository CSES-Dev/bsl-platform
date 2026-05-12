import { prisma } from "@/lib/prisma";
import GalleryPageLayout from "@/components/ui/GalleryPageLayout";
import GalleryGrid from "@/components/ui/GalleryGrid";

export default async function OrganizationsPage() {
  const applications = await prisma.application.findMany({
    where: { type: "org", status: "approved" },
  });

  const items = applications.map((app) => {
    const payload = app.payload as Record<string, unknown>;
    return {
      name: (payload.companyName as string) ?? "Untitled",
      description: (payload.description as string) ?? "",
      websiteUrl: (payload.websiteUrl as string | undefined) ?? undefined,
    };
  });

  return (
    <GalleryPageLayout title="Apply to Join Organizations & Company Projects">
      <GalleryGrid
        items={items}
        applyHref="/apply/organization"
        emptyMessage="No approved organizations yet. Check back soon!"
      />
    </GalleryPageLayout>
  );
}
