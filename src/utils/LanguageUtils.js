import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const LanguageUtils = {
  init(resources, lng, availableLanguages) {
    i18n
      .use(Backend)
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        resources,
        lng,
        fallbackLng: lng,
        ns: 'translation',
        defaultNS: 'translation',
        detection: {
          checkWhitelist: true
        },
        debug: false,
        whitelist: availableLanguages,
        interpolation: {
          escapeValue: false
        },
        // react i18next special options (optional)
        // override if needed - omit if ok with defaults
        react: {
          bindI18n: 'languageChanged',
          bindI18nStore: '',
          transEmptyNodeValue: '',
          transSupportBasicHtmlNodes: true,
          transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
          useSuspense: true
        }
      });
  }
};

export { LanguageUtils, i18n, useTranslation };
