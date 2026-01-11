"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminDistributors = () => {
  const router = useRouter();
  const [list, setList] = useState([]);

  const [form, setForm] = useState({
    name: "",
    location: "",
    contact: "",
    products: ""
  });

  useEffect(() => {
  const role = localStorage.getItem("krushimitra-role");
  if (role !== "admin") router.push("/login");

  fetch("/api/admin/distributors")
    .then(res => res.json())
    .then(setList);
}, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/admin/distributors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        location: form.location,
        contact: form.contact,
        products: form.products.split(",")
      })
    });

    location.reload();
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-2xl font-bold mb-4">🏪 Manage Distributors</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6 space-y-3"
      >
        <input
          placeholder="Distributor Name"
          className="border p-2 w-full"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Location"
          className="border p-2 w-full"
          onChange={e => setForm({ ...form, location: e.target.value })}
        />
        <input
          placeholder="Contact Number"
          className="border p-2 w-full"
          onChange={e => setForm({ ...form, contact: e.target.value })}
        />
        <input
          placeholder="Products (comma separated)"
          className="border p-2 w-full"
          onChange={e => setForm({ ...form, products: e.target.value })}
        />

        <button className="bg-green-700 text-white px-4 py-2 rounded">
          Add Distributor
        </button>
      </form>

      <div className="space-y-3">
        {list.map(d => (
          <div key={d._id} className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold">{d.name}</h2>
            <p>📍 {d.location}</p>
            <p>📞 {d.contact}</p>
            <p>🧪 Products: {d.products.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDistributors;
