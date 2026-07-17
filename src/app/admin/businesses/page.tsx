import { supabase } from "@/lib/supabase";
import AdminBusinessActions from "@/components/AdminBusinessActions";
export default async function BusinessesPage() {
  const { data: businesses, error } = await supabase
    .from("businesses")
    .select("*")
    .order("id", { ascending: false });

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-black">
        Business Management
      </h1>

      {error && (
        <p className="text-red-600">
          Error loading businesses
        </p>
      )}

      <div className="space-y-4">
        {businesses?.map((business) => (
          <div
            key={business.id}
            className="bg-white p-5 rounded-xl shadow"
          >
            <h2 className="text-xl font-bold text-black">
              {business.name}
            </h2>

            <p className="text-gray-500">
              ID: {business.id}
            </p>

            <p className="text-gray-700">
              Category: {business.category}
            </p>

            <p className="text-gray-700">
              Area: {business.area}
            </p>

            <p className="text-gray-700">
              Phone: {business.phone}
            </p>

            <p className="text-gray-700">
              WhatsApp: {business.whatsapp}
            </p>

            <p className="text-gray-700">
              Address: {business.address}
            </p>

            <p className="text-gray-700">
              Landmark: {business.landmark}
            </p>

            <p className="text-gray-700">
              Driver Directions: {business.driver_directions}
            </p>

            <p className="text-gray-700">
  	      Latitude: {business.latitude}
	    </p>

	     <p className="text-gray-700">
               Longitude: {business.longitude}
             </p>

	     <p className="text-gray-700">
  		GPS: {business.latitude}, {business.longitude}
	     </p>

             <p
                className={`font-semibold ${
                  business.approval_status === "approved"
                    ? "text-green-600"
                    : business.approval_status === "rejected"
                    ? "text-red-600"
                    : "text-orange-600"
                }`}
             >
                Status: {business.approval_status || "pending"}
             </p>

            <AdminBusinessActions
              id={business.id}
	    />
          </div>
        ))}
      </div>
    </main>
  );
}