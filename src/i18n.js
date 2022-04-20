import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import Backend from "i18next-xhr-backend";

i18n.on("languageChanged", function (lng) {
  localStorage.setItem("lng", lng);
});

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === "production" ? false : true,
    fallbackLng: "de",
    whitelist: ["en", "de", "dk"], //Array of abbrevations of the languages
    interpolation: {
      escapeValue: false,
    },
    ns: ["translation"], //Names of the translation files
    backend: {
      loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`, //Path to the translation files
      addPath: `${process.env.PUBLIC_URL}/locales/add/{{lng}}/{{ns}}`,
    },
    detection: {
      order: ["localStorage"],
      lookupLocalStorage: "lng",
      checkWhitelist: true,
    },
    saveMissing: true,
    saveMissingTo: "all",
  });

export default i18n;
