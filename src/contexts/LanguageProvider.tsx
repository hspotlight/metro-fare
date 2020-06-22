import React, { createContext, useState, ReactNode } from "react";

export type Language = "en" | "th";

const defaultLanguage: Language = "en";

const initialContextValue = {
  language: "en",
  setLanguage: (_: Language) => {},
};
export const LanguageContext = createContext(initialContextValue);

const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLang] = useState<Language>(defaultLanguage);

  const setLanguage = (lang: Language) => {
    setLang(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
