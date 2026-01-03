"use client";

import { useLanguage } from "@/context/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const Dashboard = () => {
  const { t } = useLanguage();

  // Dummy data (frontend only)
  const soilReport = {
    health: "Good",
    crops: ["Wheat", "Maize", "Soybean"],
    fertilizer: "Urea recommended (Nitrogen is slightly low)",
    moistureAdvice: "Irrigation is adequate"
  };

  return (
    <div className="min-h-screen bg-green-50 px-4 py-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-green-800">
          📊 {t.soilHealth || "Soil Report"}
        </h1>
        <LanguageSelector />
      </div>

      <div className="max-w-2xl mx-auto space-y-5">

        {/* Soil Health Card */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            🌱 Soil Health
          </h2>
          <p className="text-lg">{soilReport.health}</p>
        </div>

        {/* Crop Suggestions */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            🌾 Suggested Crops
          </h2>
          <ul className="list-disc list-inside text-lg">
            {soilReport.crops.map((crop, index) => (
              <li key={index}>{crop}</li>
            ))}
          </ul>
        </div>

        {/* Fertilizer Advice */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            🧪 Fertilizer Advice
          </h2>
          <p className="text-lg">{soilReport.fertilizer}</p>
        </div>

        {/* Moisture Advice */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            💧 Moisture Status
          </h2>
          <p className="text-lg">{soilReport.moistureAdvice}</p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
