const SET_TRACK = 'SET_TRACK';
const SET_TIME = 'SET_TIME';
const TOGGLE_TRACK = 'TOGGLE_TRACK';
const SET_LOCALE = 'SET_LOCALE';

export const setCurrentTrack = track => ({
  type: SET_TRACK,
  track,
});

export const setTrackInfo = (time, duration) => ({
  type: SET_TIME,
  time,
  duration,
});

export const toggleCurrentTrack = () => ({
  type: TOGGLE_TRACK,
});

export const setLocale = locale => ({
  type: SET_LOCALE,
  locale,
});
