export const SET_TRACK = 'SET_TRACK';
export const SET_TIME = 'SET_TIME';
export const TOGGLE_TRACK = 'TOGGLE_TRACK';

const initialState = {};

export const currentTrack = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRACK:
      return action.track;
    default:
      return state;
  }
};

export const currentTime = (state = 0, action) => {
  switch (action.type) {
    case SET_TIME:
      return action.currentTime;
    default:
      return state;
  }
};

export const toggleTrack = (state = null, action) => {
  switch (action.type) {
    case TOGGLE_TRACK:
      if (!action.audio.src) {
        return state;
      }

      if (action.audio.paused) {
        action.audio.play();
      } else {
        action.audio.pause();
      }
      return action.audio;
    default:
      return state;
  }
};
