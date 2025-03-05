import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import navibarEn from "../locales/en/en.json";
import navibarJa from "../locales/ja/ja.json";
import navibarCh from "../locales/ch/ch.json";

const resources = {
  en:navibarEn,
 
  ja: navibarJa,
 
  zh:navibarCh,

};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,

    fallbackLng: "en",
    lng: "en",
    interpolation: {
      escapeValue: false,
    },
    debug: true,
  });
