import { combineReducers } from 'redux';
import catalog from './catalog';
import { currentTrack, currentTime, toggleTrack } from './player';
import { locale } from './locale';

const appReducers = combineReducers({
  catalog,
  currentTrack,
  currentTime,
  toggleTrack,
  locale,
});

export default appReducers;
