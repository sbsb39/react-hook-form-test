import 'core-js/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import App from '@/App';
import { LanguageUtils } from '@/utils/LanguageUtils';

import { en, ko, fr, es, cn, ja } from '@/locales';
LanguageUtils.init(
  {
    en: {
      translation: en
    },
    ko: {
      translation: ko
    },
    fr: {
      translation: fr
    },
    es: {
      translation: es
    },
    cn: {
      translation: cn
    },
    ja: {
      translation: ja
    }
  },
  // Default language
  'ko',
  // Available languages
  ['en', 'ko', 'fr', 'es', 'cn', 'ja']
);

ReactDOM.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  document.getElementById('root')
);
