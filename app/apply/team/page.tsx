import PublicLayout from "@/components/layout/PublicLayout";
import TeamForm from "@/components/forms/TeamForm";

export default function TeamApplyPage() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Team Application</h1>
        <p className="text-gray-600 mb-8">Tell us about your team!</p>
        <TeamForm />
      </div>
    </PublicLayout>
  );
}
