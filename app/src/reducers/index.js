// @flow

import { combineReducers } from 'redux';
import { currentTrack, trackInfo, toggleTrack } from './player';
import { locale } from './locale';
import { search } from './search';

const appReducers = combineReducers({
  currentTrack,
  trackInfo,
  playerState: toggleTrack,
  locale,
  search,
});

export default appReducers;
