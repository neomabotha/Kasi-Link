import { supabase } from "@/lib/supabase";

export default async function AreasPage() {
  const { data: areas, error } = await supabase
    .from("areas")
    .select("*")
    .order("name");

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-black">
        Areas Management
      </h1>

      {error && (
        <p className="text-red-600">
          Error loading areas
        </p>
      )}

      <div className="space-y-3">
        {areas?.map((area) => (
          <div
            key={area.id}
            className="bg-white p-4 rounded-xl shadow"
          >
            <h2 className="font-semibold text-black">
              {area.name}
            </h2>

            <p className="text-gray-600">
              Active: {area.active ? "Yes" : "No"}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}