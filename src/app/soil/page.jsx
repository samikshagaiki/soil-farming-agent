"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const SoilInputPage = () => {
  const { t } = useLanguage();
  const router = useRouter();

  const [formData, setFormData] = useState({
    ph: "",
    moisture: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    location: ""
  });

  // Protect route (frontend only)
  useEffect(() => {
    const isAuth = localStorage.getItem("krushimitra-auth");
    if (!isAuth) {
      router.push("/login");
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await fetch("/api/soil", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  });

  const data = await res.json();

  localStorage.setItem("soil-result", JSON.stringify(data));
  localStorage.setItem("krushimitra-auth", "true");

  router.push("/dashboard");
};


  return (
    <div className="min-h-screen bg-green-50 px-4 py-6">

      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-green-800">
          🌱 {t.soil?.title || "Enter Soil Details"}
        </h1>
        <LanguageSelector />
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-5"
      >
        {/* pH */}
        <div>
          <label className="block text-lg font-medium text-green-700 mb-1">
            {t.soil?.ph || "Soil pH"}
          </label>
          <input
            type="number"
            step="0.1"
            name="ph"
            value={formData.ph}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 text-lg"
            placeholder="Eg: 6.5"
            required
          />
        </div>

        {/* Moisture */}
        <div>
          <label className="block text-lg font-medium text-green-700 mb-1">
            {t.soil?.moisture || "Moisture (%)"}
          </label>
          <input
            type="number"
            name="moisture"
            value={formData.moisture}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 text-lg"
            placeholder="Eg: 40"
            required
          />
        </div>

        {/* Nitrogen */}
        <div>
          <label className="block text-lg font-medium text-green-700 mb-1">
            {t.soil?.nitrogen || "Nitrogen (N)"}
          </label>
          <input
            type="number"
            name="nitrogen"
            value={formData.nitrogen}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 text-lg"
            placeholder="Eg: 60"
            required
          />
        </div>

        {/* Phosphorus */}
        <div>
          <label className="block text-lg font-medium text-green-700 mb-1">
            {t.soil?.phosphorus || "Phosphorus (P)"}
          </label>
          <input
            type="number"
            name="phosphorus"
            value={formData.phosphorus}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 text-lg"
            placeholder="Eg: 45"
            required
          />
        </div>

        {/* Potassium */}
        <div>
          <label className="block text-lg font-medium text-green-700 mb-1">
            {t.soil?.potassium || "Potassium (K)"}
          </label>
          <input
            type="number"
            name="potassium"
            value={formData.potassium}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 text-lg"
            placeholder="Eg: 50"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-lg font-medium text-green-700 mb-1">
            {t.soil?.location || "Village / Location"}
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 text-lg"
            placeholder="Eg: Pune"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-700 text-white text-xl py-3 rounded-lg shadow-md hover:bg-green-800 transition"
        >
          {t.soil?.submit || "Submit"}
        </button>
      </form>
    </div>
  );
};

export default SoilInputPage;
