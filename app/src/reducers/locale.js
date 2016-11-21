export const SET_LOCALE = 'SET_LOCALE';

/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const enMessages = require('../langs/en.js').default;

const langCache = {
  en: enMessages,
};

const initialState = {
  code: 'en',
  messages: langCache.en,
};

export const locale = (state = initialState, action) => {
  let messages;

  switch (action.type) {
    case SET_LOCALE:
      if (langCache[action.locale]) {
        messages = langCache[action.locale];
      } else {
        messages = langCache[action.locale] = require(`../langs/${action.locale}.js`).default;
      }
      return {
        code: action.locale,
        messages,
      };
    default:
      return state;
  }
};
