import PublicLayout from "@/components/layout/PublicLayout";
import StartupForm from "@/components/forms/StartupForm";

export default function StartupApplyPage() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Startup Application</h1>
        <p className="text-gray-600 mb-8">Tell us more about your startup!</p>
        <StartupForm />
      </div>
    </PublicLayout>
  );
}
