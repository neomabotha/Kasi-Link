"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Home() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [areas, setAreas] = useState<any[]>([]);

  useEffect(() => {
    async function loadBusinesses() {
      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("approval_status", "approved");

      if (!error) {
        setBusinesses(data || []);
      }

      const categoriesResponse = await fetch("/api/categories");
      const categoriesData = await categoriesResponse.json();

      const areasResponse = await fetch("/api/areas");
      const areasData = await areasResponse.json();

      setCategories(categoriesData);
      setAreas(areasData);
      }

    loadBusinesses();
  }, []);

  const filteredBusinesses = businesses.filter((business) => {
  const matchesSearch =
    business.name?.toLowerCase().includes(search.toLowerCase()) ||
    business.category?.toLowerCase().includes(search.toLowerCase()) ||
    business.area?.toLowerCase().includes(search.toLowerCase());

  const matchesCategory =
    !selectedCategory ||
    business.category === selectedCategory;

  const matchesArea =
    !selectedArea ||
    business.area === selectedArea;

  return (
    matchesSearch &&
    matchesCategory &&
    matchesArea
  );
});

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-6">
      <div className="max-w-5xl mx-auto">
<div className="text-center mb-10">

  <h1 className="text-5xl font-bold text-emerald-700">
    Kasi-Link
  </h1>

  <p className="text-lg text-gray-600 mt-3">
    Find trusted local businesses in Hammanskraal,
    Temba and surrounding areas.
  </p>

</div>

<div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

        <input
          className="w-full border border-gray-300 p-3 rounded mb-6 text-black"
          placeholder="Search businesses, categories or areas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

<select
    className="border border-gray-300 p-3 rounded text-black"
    value={selectedCategory}
    onChange={(e) =>
      setSelectedCategory(e.target.value)
    }
  >
    <option value="">
      All Categories
    </option>

    {categories.map((cat) => (
      <option
        key={cat.id}
        value={cat.name}
      >
        {cat.name}
      </option>
    ))}
  </select>

<select
    className="border border-gray-300 p-3 rounded text-black"
    value={selectedArea}
    onChange={(e) =>
      setSelectedArea(e.target.value)
    }
  >
    <option value="">
      All Areas
    </option>

    {areas.map((areaItem) => (
      <option
        key={areaItem.id}
        value={areaItem.name}
      >
        {areaItem.name}
      </option>
    ))}
  </select>

</div>

</div>


        <div className="grid md:grid-cols-2 gap-6">
          {filteredBusinesses.map((business) => (
            <div
              key={business.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
            >
              <h2 className="text-xl font-bold text-black">
                {business.name}
              </h2>

              <div className="mt-2">
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
    {business.category}
  </span>
</div>

              <div className="mt-2">
  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
    {business.area}
  </span>
</div>

              <p className="mt-3 text-gray-700">
  📞 {business.phone}
</p>

<p className="text-gray-700">
  💬 {business.whatsapp}
</p>

             <p className="text-gray-600 mt-2">
  📍 {business.landmark}
</p>

              <Link
                href={`/business/${business.id}`}
                className="inline-block mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg transition"
              >
               View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}