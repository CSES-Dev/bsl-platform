import GalleryPageLayout from "@/components/ui/GalleryPageLayout";
import GallerySkeleton from "@/components/ui/GallerySkeleton";

export default function TeamsLoading() {
  return (
    <GalleryPageLayout title="Apply to Join Product Teams" highlightFrom="Join">
      <GallerySkeleton />
    </GalleryPageLayout>
  );
}
