"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { type Locale, defaultLocale, locales } from "./config";
import { translations } from "./translations";

// Define the context type
interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

// Create context with just locale state (not translations)
const LocaleContext = createContext<LocaleContextType>({
  locale: defaultLocale,
  setLocale: () => {},
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const stored = localStorage.getItem("locale") as Locale | null;
    if (stored && locales.includes(stored)) {
      setLocaleState(stored);
      document.documentElement.lang = stored;
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
    document.documentElement.lang = newLocale;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

// Hook that returns locale context AND translations directly from the import
export function useLocale() {
  const context = useContext(LocaleContext);
  const locale = context?.locale || defaultLocale;
  
  // Always return translations directly from the imported object
  // This ensures translations are ALWAYS available, even during SSR
  const t = translations[locale] || translations[defaultLocale];
  
  return {
    locale,
    setLocale: context?.setLocale || (() => {}),
    t,
  };
}
