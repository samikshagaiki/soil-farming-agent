"use client";

import { createContext, useContext, useEffect, useState } from "react";
import en from "@/translations/en.json";
import hi from "@/translations/hi.json";
import mr from "@/translations/mr.json";
import { translateText } from "@/utils/translate";

const LanguageContext = createContext(undefined);

const localLanguages = { en, hi, mr };

const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("en");
  const [t, setT] = useState(en);

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", lang);

    if (localLanguages[lang]) {
      setT(localLanguages[lang]);
    } else {
      const translateAll = async () => {
        const translated = {};
        for (const key in en) {
          translated[key] = await translateText(en[key], lang);
        }
        setT(translated);
      };
      translateAll();
    }
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
};
export default LanguageProvider;