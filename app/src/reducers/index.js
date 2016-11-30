// @flow

import { combineReducers } from 'redux';
import { currentTrack, trackInfo, toggleTrack } from './player';
import { locale } from './locale';

const appReducers = combineReducers({
  currentTrack,
  trackInfo,
  playerState: toggleTrack,
  locale,
});

export default appReducers;
