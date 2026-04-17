import ProfileDropdown from "@/components/admin/ProfileDropdown";

export default function AdminPage() {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-gray-100 pb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <ProfileDropdown />
      </div>
    </div>
  );
}
