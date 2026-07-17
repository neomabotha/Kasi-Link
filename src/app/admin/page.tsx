import { supabase } from "@/lib/supabase";

export default async function AdminPage() {
  const { count: totalBusinesses } = await supabase
    .from("businesses")
    .select("*", { count: "exact", head: true });

  const { count: approvedBusinesses } = await supabase
    .from("businesses")
    .select("*", { count: "exact", head: true })
    .eq("approval_status", "approved");

  const { count: pendingBusinesses } = await supabase
    .from("businesses")
    .select("*", { count: "exact", head: true })
    .eq("approval_status", "pending");

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-black">
        Kasi-Link Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold">Businesses</h2>
          <p className="text-3xl">{totalBusinesses ?? 0}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold">Approved</h2>
          <p className="text-3xl text-green-600">
            {approvedBusinesses ?? 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold">Pending</h2>
          <p className="text-3xl text-orange-600">
            {pendingBusinesses ?? 0}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-blue-600">
          Open /admin/businesses to manage businesses
        </p>
      </div>
    </main>
  );
}