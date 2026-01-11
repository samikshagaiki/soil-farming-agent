"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LanguageSelector from "@/components/LanguageSelector";

const LoginPage = () => {
  const router = useRouter();

  // ✅ formData IS DEFINED HERE
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    // ✅ store auth info
    localStorage.setItem("krushimitra-auth", "true");
    localStorage.setItem("krushimitra-role", data.user.role);
    localStorage.setItem("krushimitra-user", JSON.stringify(data.user));

    // ✅ role-based redirect
    if (data.user.role === "admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/soil");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 relative">

      {/* Language selector */}
      <div className="absolute top-6 right-6">
        <LanguageSelector />
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md space-y-5"
      >
        <h1 className="text-2xl font-bold text-green-800 text-center">
          🔐 Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3 text-lg"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3 text-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-700 text-white text-lg py-3 rounded-lg shadow-md"
        >
          Login
        </button>

        <p className="text-center text-sm">
          New user?{" "}
          <span
            className="text-green-700 font-medium cursor-pointer"
            onClick={() => router.push("/register")}
          >
            Create Account
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
