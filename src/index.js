import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import en from './languages/en/global.json'
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import korean from './languages/kor/global.json'


i18next.init({
  interpolation: { escapeValue: false },
  lng: 'kor', // Set the default language
  fallbackLng: 'en', // Set the fallback language
  resources: {
    en: {
      global: en,
    },
    kor: {
      global: korean,
    },
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
   <I18nextProvider i18n={i18next}>
    <App />
   </I18nextProvider>
  </BrowserRouter>
);