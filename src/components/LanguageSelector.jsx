"use client";

import { useLanguage } from "@/context/LanguageContext";

const LanguageSelector = () => {
  const { lang, setLang } = useLanguage();

  return (
    <select
      value={lang}
      onChange={(e) => setLang(e.target.value)}
      className="
        px-4 py-2
        rounded-md
        border-2 border-green-700
        bg-white
        text-green-800
        font-medium
        shadow-md
        focus:outline-none
      "
    >
      <option value="en">English</option>
      <option value="hi">हिंदी</option>
      <option value="mr">मराठी</option>
    </select>
  );
};

export default LanguageSelector;
