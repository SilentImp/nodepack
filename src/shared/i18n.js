import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';
import Cache from 'i18next-localstorage-cache';
import LanguageDetector from 'i18next-browser-languagedetector';
import sprintf from 'i18next-sprintf-postprocessor';

i18next
  .use(XHR)
  .use(Cache)
  .use(LanguageDetector)
  .use(sprintf)
  .init({
    overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
    detection: {
      lookupQuerystring: 'lang',
    },
    load: 'languageOnly',
    wait: false,
    debug: false,
    keySeparator: '-___-',
    nsSeparator: '-____-',
    pluralSeparator: '-_____-',
    contextSeparator: '-______-',
    resources: {},
  });

export default i18next;
