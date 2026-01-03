"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const RegisterPage = () => {
  const { t } = useLanguage();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // FRONTEND ONLY (fake register)
    localStorage.setItem("krushimitra-user", JSON.stringify(formData));

    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 relative">

      {/* Language Selector */}
      <div className="absolute top-6 right-6">
        <LanguageSelector />
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md space-y-5"
      >
        <h1 className="text-2xl font-bold text-green-800 text-center">
          📝 {t.register.title || Register}
        </h1>

        <input
          type="text"
          name="name"
          placeholder={t.register.name || "Full Name"}
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3 text-lg"
          required
        />

        <input
          type="email"
          name="email"
          placeholder={t.register.email || "Email"}
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3 text-lg"
          required
        />

        <input
          type="password"
          name="password"
          placeholder={t.register.password || "Password"}
          value={formData.password}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3 text-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-700 text-white text-lg py-3 rounded-lg shadow-md"
        >
          {t.register.submit || "Create Account"}
        </button>

        <p className="text-center text-sm">
          {t.register.alreadyRegistered || "Already registered"}?{" "}
          <span
            className="text-green-700 font-medium cursor-pointer"
            onClick={() => router.push("/login")}
          >
            {t.login.submit || "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
