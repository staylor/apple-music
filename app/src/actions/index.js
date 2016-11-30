// @flow

export const SET_TRACK = 'SET_TRACK';
export const SET_TRACK_INFO = 'SET_TRACK_INFO';
export const TOGGLE_TRACK = 'TOGGLE_TRACK';
export const SET_LOCALE = 'SET_LOCALE';

export const setCurrentTrack = (track: Object): Object => ({
  type: SET_TRACK,
  track,
});

export const setTrackInfo = (time: number, duration: number): Object => ({
  type: SET_TRACK_INFO,
  time,
  duration,
});

export const toggleCurrentTrack = (): Object => ({
  type: TOGGLE_TRACK,
});

export const setLocale = (locale: string): Object => ({
  type: SET_LOCALE,
  locale,
});
