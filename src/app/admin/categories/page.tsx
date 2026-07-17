import { supabase } from "@/lib/supabase";

export default async function CategoriesPage() {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-black">
        Categories Management
      </h1>

      {error && (
        <p className="text-red-600">
          Error loading categories
        </p>
      )}

      <div className="space-y-3">
        {categories?.map((category) => (
          <div
            key={category.id}
            className="bg-white p-4 rounded-xl shadow"
          >
            <h2 className="font-semibold text-black">
              {category.name}
            </h2>

            <p className="text-gray-600">
              Active: {category.active ? "Yes" : "No"}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}