"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";

import LanguageSelector from "@/components/LanguageSelector";

const LoginPage = () => {

  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    const result = await signIn(
      "credentials",
      {
        email: formData.email,
        password: formData.password,
        redirect: false
      }
    );

    setLoading(false);

    if (result.error) {
      alert(result.error);
      return;
    }

    router.push("/soil");
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 relative">

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
          {
            loading
            ? "Loading..."
            : "Login"
          }
        </button>

      </form>
    </div>
  );
};

export default LoginPage;