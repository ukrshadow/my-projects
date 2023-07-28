import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import languagedetector from 'i18next-browser-languagedetector';
import backend from 'i18next-http-backend';
const getCityNameFromStore = JSON.parse(localStorage.getItem('weather')).state.currentLanguage
const path = ('path');

i18n
.use(backend)
.use(languagedetector)
.use(initReactI18next)
/* .configure({
    directory: path.join(__dirname, '/locales')
}) */
.init({
    debug: false,
    fallback: 'en',
    /* lng: getCityNameFromStore === undefined ? 'en': getCityNameFromStore, */
    locales: ['en', 'ua', 'he'],
    defaultLocale: 'en',
    autoReload: true,
    extension: '.json',
    interpolation : {
        escapeValue: false
    },
    directory:'./assets/public/locales', 
    loadPath: "./assets/locales/{{lng}}/{{ns}}.json",
    
});

//const i18n = new I18n({
//    locales: ['en', 'zh-TW'],
//    defaultLocale: 'en',
//    autoReload: true,
//    extension: '.json',
//    directory: path.join('./src', 'locales')
// });
 
export default i18n
