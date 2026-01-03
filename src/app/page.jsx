"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const Home = () => {
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center px-4 relative">

      {/* Language selector */}
      <div className="absolute top-6 right-6">
        <LanguageSelector />
      </div>

      {/* Logo / Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-green-800">
        🌾 {t.appName}
      </h1>

      <p className="mt-3 text-lg text-green-700 text-center">
        {t.tagline}
      </p>

      {/* Auth Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => router.push("/login")}
          className="bg-white border-2 border-green-700 text-green-700 text-lg px-8 py-3 rounded-lg font-medium"
        >
          Login
        </button>

        <button
          onClick={() => router.push("/register")}
          className="bg-green-700 text-white text-lg px-8 py-3 rounded-lg shadow-md"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Home;
