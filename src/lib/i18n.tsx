import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import {
  type SupportedLanguage,
  SUPPORTED_LANGUAGES,
  REGIONAL_STRINGS,
  type RegionalStrings,
  type LanguageInfo,
} from "@/data/regionalContent";
import { track } from "@/lib/analytics";

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  strings: RegionalStrings;
  supportedLanguages: LanguageInfo[];
}

const STORAGE_KEY = "apnacare_user_lang";

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  strings: REGIONAL_STRINGS.en,
  supportedLanguages: SUPPORTED_LANGUAGES,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null;
        if (saved && (saved === "en" || saved === "ta" || saved === "te" || saved === "kn" || saved === "ml")) {
          return saved;
        }
      } catch (e) {
        // Ignore localStorage error
      }
    }
    return "en";
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, lang);
        document.documentElement.lang = lang;
      } catch (e) {
        // Ignore error
      }
    }
    track("language_switched", { selected_language: lang });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const strings = REGIONAL_STRINGS[language] || REGIONAL_STRINGS.en;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        strings,
        supportedLanguages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
