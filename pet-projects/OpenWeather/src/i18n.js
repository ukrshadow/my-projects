import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import languagedetector from 'i18next-browser-languagedetector';
import backend from 'i18next-http-backend';

const getCityNameFromStore = JSON.parse(localStorage.getItem('weather')).state.currentLanguage

i18n
    .use(backend)
    .use(languagedetector)
    .use(initReactI18next)
    .init({
        debug: false,
        fallbackLng: 'en',
        lng: getCityNameFromStore === undefined ? 'en' : getCityNameFromStore,
        defaultLanguage: 'en',
        interpolation: {
            escapeValue: false
        },
        backend: {
            loadPath: './locales/{{lng}}/{{ns}}.json'
        },
    });

export default i18n
