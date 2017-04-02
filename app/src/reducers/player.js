// @flow

import { SET_TRACK, SET_TRACK_INFO, TOGGLE_TRACK } from 'actions';

export const PLAYER_IDLE = 0;
export const PLAYER_ACTIVE = 1;

const initialState = {};

export const currentTrack = (state: Object = initialState, action: Object): Object => {
  switch (action.type) {
    case SET_TRACK:
      return action.track;
    default:
      return state;
  }
};

const trackState = {
  currentTime: 0,
  duration: 0,
};

export const trackInfo = (state: Object = trackState, action: Object): Object => {
  switch (action.type) {
    case SET_TRACK_INFO:
      return {
        currentTime: action.time,
        duration: action.duration,
      };
    default:
      return state;
  }
};

export const toggleTrack = (state: number = PLAYER_IDLE, action: Object): number => {
  switch (action.type) {
    case TOGGLE_TRACK:
      if (state === PLAYER_IDLE) {
        return PLAYER_ACTIVE;
      }
      return PLAYER_IDLE;
    default:
      return state;
  }
};
