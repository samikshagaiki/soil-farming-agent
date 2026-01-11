"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LanguageSelector from "@/components/LanguageSelector";

const AdminDashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("krushimitra-auth");
    const role = localStorage.getItem("krushimitra-role");

    if (!auth || role !== "admin") {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-green-50 px-6 py-6">
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-800">
          🧑‍💼 Admin Dashboard
        </h1>
        <LanguageSelector />
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">

        {/* Soil Rules */}
        <div
          onClick={() => router.push("/admin/soil-rules")}
          className="bg-white p-6 rounded-xl shadow cursor-pointer hover:bg-green-100"
        >
          <h2 className="text-xl font-semibold text-green-700">
            🌱 Manage Soil Rules
          </h2>
          <p className="text-gray-600 mt-2">
            Define soil conditions and recommended crops
          </p>
        </div>

        {/* Distributors */}
        <div
          onClick={() => router.push("/admin/distributors")}
          className="bg-white p-6 rounded-xl shadow cursor-pointer hover:bg-green-100"
        >
          <h2 className="text-xl font-semibold text-green-700">
            🏪 Manage Distributors
          </h2>
          <p className="text-gray-600 mt-2">
            Add or update supplier information
          </p>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
