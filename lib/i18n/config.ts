export const locales = ["uk", "ru", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "uk";

export const localeNames: Record<Locale, string> = {
  uk: "UA",
  ru: "RU",
  en: "EN",
};

export const localeFullNames: Record<Locale, string> = {
  uk: "Українська",
  ru: "Русский",
  en: "English",
};
