import { combineReducers } from 'redux';
import catalog from './catalog';
import { currentTrack, trackInfo, toggleTrack } from './player';
import { locale } from './locale';

const appReducers = combineReducers({
  catalog,
  currentTrack,
  trackInfo,
  playerState: toggleTrack,
  locale,
});

export default appReducers;
