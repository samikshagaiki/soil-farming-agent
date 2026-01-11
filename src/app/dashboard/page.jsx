"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LanguageSelector from "@/components/LanguageSelector";

const DashboardPage = () => {
  const router = useRouter();

  const [soilData, setSoilData] = useState(null);
  const [distributors, setDistributors] = useState([]);

  // Protect dashboard (user only)
  useEffect(() => {
    const auth = localStorage.getItem("krushimitra-auth");
    const role = localStorage.getItem("krushimitra-role");

    if (!auth || role !== "user") {
      router.push("/login");
    }
  }, [router]);

  // Load soil result
  useEffect(() => {
    const data = localStorage.getItem("soil-result");
    if (data) {
      setSoilData(JSON.parse(data));
    }
  }, []);

  // Fetch distributors (admin-managed)
  useEffect(() => {
    fetch("/api/admin/distributors")
      .then((res) => res.json())
      .then((data) => setDistributors(data));
  }, []);

  if (!soilData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        No soil data available
      </div>
    );
  }

  // ✅ FILTER distributors by user location (city-based)
  const nearbyDistributors = distributors.filter(
  d => d.city === soilData.location.toLowerCase()
);


  return (
    <div className="min-h-screen bg-green-50 px-4 py-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-green-800">
          🌾 Farmer Dashboard
        </h1>
        <LanguageSelector />
      </div>

      <div className="max-w-5xl mx-auto space-y-8">

        {/* 🌱 Soil Health Summary */}
        <div>
          <h2 className="text-xl font-semibold text-green-700 mb-4">
            🌱 Soil Health Summary
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <SummaryCard label="pH Value" value={soilData.ph} color="text-green-700" />
            <SummaryCard label="Moisture" value={`${soilData.moisture}%`} color="text-green-700" />
            <SummaryCard label="Nitrogen" value={soilData.nitrogen} color="text-green-700" />
            <SummaryCard label="Phosphorus" value={soilData.phosphorus} color="text-green-700" />
            <SummaryCard label="Potassium" value={soilData.potassium} color="text-green-700" />
            <SummaryCard label="Location" value={soilData.location} color="text-green-700" />
          </div>
        </div>

        {/* 🌾 Recommended Crops */}
        <div>
          <h2 className="text-xl font-semibold text-green-700 mb-4">
            🌾 Recommended Crops
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {soilData.crops.map((crop, index) => (
              <div
                key={index}
                className="bg-green-100 text-green-900 p-4 rounded-xl shadow text-center font-medium"
              >
                {crop}
              </div>
            ))}
          </div>
        </div>

        {/* 🏪 Nearby Suppliers */}
        <div>
          <h2 className="text-xl font-semibold text-green-700 mb-4">
            🏪 Nearby Agricultural Suppliers
          </h2>

          {nearbyDistributors.length === 0 ? (
            <p className="text-gray-600">
              No nearby suppliers found for {soilData.location}
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {nearbyDistributors.map((d) => (
                <div
                  key={d.id}
                  className="bg-white p-5 rounded-xl shadow"
                >
                  <h3 className="font-semibold text-lg text-green-800">
                    {d.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    📍 {d.city}
                  </p>
                  <p className="text-sm mt-1">
                    📞 {d.contact}
                  </p>
                  <p className="text-sm mt-2">
                    🧪 {d.products.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

/* 🔹 Reusable summary card */
const SummaryCard = ({ label, value, color }) => (
  <div className="bg-white p-4 rounded-xl shadow text-center">
    <p className="text-gray-500">{label}</p>
    <p className={`text-2xl font-bold ${color}`}>
      {value}
    </p>
  </div>
);

export default DashboardPage;
