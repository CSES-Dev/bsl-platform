import GalleryPageLayout from "@/components/ui/GalleryPageLayout";
import GallerySkeleton from "@/components/ui/GallerySkeleton";

export default function StartupsLoading() {
  return (
    <GalleryPageLayout title="Apply to Join Startups" highlightFrom="Join">
      <GallerySkeleton />
    </GalleryPageLayout>
  );
}
