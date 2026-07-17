import { supabase } from "@/lib/supabase";

export default async function BusinessDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: business, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (!business) {
    return (
      <main className="p-6">
        <h1>Business not found</h1>
        <p>ID requested: {id}</p>
        <p>Error: {error?.message}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-emerald-700 mb-6">
          {business.name}
        </h1>

        <div className="space-y-3 text-gray-800">
          <p>
            <strong>Category:</strong> {business.category}
          </p>

          <p>
            <strong>Area:</strong> {business.area}
          </p>

          <p>
            <strong>Phone:</strong> {business.phone}
          </p>

          <p>
            <strong>WhatsApp:</strong> {business.whatsapp}
          </p>

          <p>
            <strong>Address:</strong> {business.address}
          </p>

          <p>
            <strong>Landmark:</strong> {business.landmark}
          </p>

          <p>
            <strong>Driver Directions:</strong>{" "}
            {business.driver_directions}
          </p>

          <p>
            <strong>Latitude:</strong> {business.latitude}
          </p>

          <p>
            <strong>Longitude:</strong> {business.longitude}
          </p>

          </div>
<div className="mt-8">
  <p className="text-green-700 font-semibold">
    Contact details available above.
  </p>
</div>
      </div>
    </main>
  );
}