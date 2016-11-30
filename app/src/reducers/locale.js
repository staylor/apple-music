import { addLocaleData } from 'react-intl';

export const SET_LOCALE = 'SET_LOCALE';

/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const langCache = {};

export const getMessages = (locale: string): Object => {
  if (langCache[locale]) {
    return langCache[locale];
  }

  langCache[locale] = require(`../langs/${locale}.js`).default;

  return langCache[locale];
};

export const getLocaleData = (locale: string) => (
  require(`react-intl/locale-data/${locale}`)
);

export const setLocaleData = (locale: string) => {
  if (typeof window === 'undefined') {
    return;
  }
  addLocaleData(getLocaleData(locale));
};

const initialState = {
  code: 'en',
  messages: getMessages('en'),
};

export const locale = (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case SET_LOCALE:
      setLocaleData(action.locale);
      return {
        code: action.locale,
        messages: getMessages(action.locale),
      };
    default:
      return state;
  }
};
