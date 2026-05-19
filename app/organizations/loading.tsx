import GalleryPageLayout from "@/components/ui/GalleryPageLayout";
import GallerySkeleton from "@/components/ui/GallerySkeleton";

export default function OrganizationsLoading() {
  return (
    <GalleryPageLayout
      title="Apply to Join Organizations & Company Projects"
      highlightFrom="Join"
    >
      <GallerySkeleton />
    </GalleryPageLayout>
  );
}
