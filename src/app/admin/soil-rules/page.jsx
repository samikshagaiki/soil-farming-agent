"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminSoilRules = () => {
  const router = useRouter();
  const [rules, setRules] = useState([]);

  const [form, setForm] = useState({
  region: "",
  phMin: "",
  phMax: "",
  moistureMin: "",
  nitrogenMin: "",
  phosphorusMin: "",
  potassiumMin: "",
  crops: ""
});

  

  useEffect(() => {
    const role = localStorage.getItem("krushimitra-role");
    if (role !== "admin") router.push("/login");

    fetch("/api/admin/soil-rules")
      .then(res => res.json())
      .then(setRules);
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/admin/soil-rules", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    region: form.region,
    phMin: Number(form.phMin),
    phMax: Number(form.phMax),
    moistureMin: Number(form.moistureMin),
    nitrogenMin: Number(form.nitrogenMin),
    phosphorusMin: Number(form.phosphorusMin),
    potassiumMin: Number(form.potassiumMin),
    crops: form.crops.split(",")
  })
});


    location.reload();
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-2xl font-bold mb-4">🌱 Manage Soil Rules</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 space-y-3">
        <input placeholder="pH Min" className="border p-2 w-full"
          onChange={e => setForm({ ...form, phMin: e.target.value })} />
        <input placeholder="pH Max" className="border p-2 w-full"
          onChange={e => setForm({ ...form, phMax: e.target.value })} />
        <input placeholder="Crops (comma separated)" className="border p-2 w-full"
          onChange={e => setForm({ ...form, crops: e.target.value })} />
        <input placeholder="Region (e.g. Nagpur)" className="border p-2 w-full"
        onChange={e => setForm({ ...form, region: e.target.value })} />

        <input placeholder="Min Moisture" className="border p-2 w-full"
        onChange={e => setForm({ ...form, moistureMin: e.target.value })} />

        <input placeholder="Min Nitrogen" className="border p-2 w-full"
        onChange={e => setForm({ ...form, nitrogenMin: e.target.value })} />

        <input placeholder="Min Phosphorus" className="border p-2 w-full"
        onChange={e => setForm({ ...form, phosphorusMin: e.target.value })} />

        <input placeholder="Min Potassium" className="border p-2 w-full"
        onChange={e => setForm({ ...form, potassiumMin: e.target.value })} />

        <button className="bg-green-700 text-white px-4 py-2 rounded">
          Add Rule
        </button>
      </form>

      <ul className="space-y-2">
        {rules.map(r => (
          <li key={r._id} className="bg-white p-3 rounded shadow">
            pH {r.phMin} - {r.phMax} → {r.crops.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSoilRules;
