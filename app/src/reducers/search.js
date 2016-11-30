// @flow

import { SET_SEARCH_TERM } from '~/actions';

export const search = (state: string = '', action: Object) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return action.term;
    default:
      return state;
  }
};
