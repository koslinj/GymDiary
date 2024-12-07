import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import translationEn from "./locales/en-GB/translation.json";
import translationPl from "./locales/pl-PL/translation.json";
import { createLanguageDetector } from 'react-native-localization-settings';

const resources = {
  "pl-PL": { translation: translationPl },
  "en-GB": { translation: translationEn },
};

const languageDetector = createLanguageDetector({});

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem("language");

  if (!savedLanguage) {
    savedLanguage = Localization.locale;
  }

  i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      compatibilityJSON: "v4",
      resources,
      lng: savedLanguage,
      fallbackLng: "en-GB",
      interpolation: {
        escapeValue: false,
      },
    });
};

initI18n();

export default i18n;
