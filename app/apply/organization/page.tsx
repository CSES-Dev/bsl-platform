import PublicLayout from "@/components/layout/PublicLayout";
import OrgForm from "@/components/forms/OrgForm";

export default function OrganizationApplyPage() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">New Company Project</h1>
        <p className="text-gray-600 mb-8">
          Submit your project proposal for review.
        </p>
        <OrgForm />
      </div>
    </PublicLayout>
  );
}
