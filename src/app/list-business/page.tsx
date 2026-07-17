"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadBusinesses() {
      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("approval_status", "approved");

      if (!error) {
        setBusinesses(data || []);
      }
    }

    loadBusinesses();
  }, []);

  const filteredBusinesses = businesses.filter((business) =>
    business.name?.toLowerCase().includes(search.toLowerCase()) ||
    business.category?.toLowerCase().includes(search.toLowerCase()) ||
    business.area?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-6 text-center text-black">
          Kasi-Link
        </h1>

        <input
          className="w-full border border-gray-300 p-3 rounded mb-6 text-black"
          placeholder="Search businesses, categories or areas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="space-y-4">
          {filteredBusinesses.map((business) => (
            <div
              key={business.id}
              className="bg-white p-5 rounded-xl shadow"
            >
              <h2 className="text-xl font-bold text-black">
                {business.name}
              </h2>

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
                <strong>Landmark:</strong> {business.landmark}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}