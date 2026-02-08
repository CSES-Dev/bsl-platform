import PublicLayout from "@/components/layout/PublicLayout";
import { currentUserRole, isAdmin, isAuthenticated } from "@/lib/mock-auth";

export default function Page() {
    return (
        <PublicLayout>
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Home Page</h1>
                <p className="mb-4 text-sm text-gray-600">
                    Current role: <span className="font-semibold">{currentUserRole}</span>
                </p>
                <div className="flex gap-2">
                    {isAuthenticated() && (
                        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                            User Action
                        </button>
                    )}
                    {isAdmin() && (
                        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                            Admin Only
                        </button>
                    )}
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Public Action
                    </button>
                </div>
            </div>
        </PublicLayout>
    );
}
