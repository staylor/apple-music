import { setTrackInfo } from '../actions';
import { PLAYER_IDLE, PLAYER_ACTIVE } from '../reducers/player';

let audio = null;
let track = 0;

const isServer = typeof document === 'undefined';

const listener = (state) => {
  if (isServer || !state) {
    return;
  }

  if (track === state.currentTrack.trackId) {
    if (!audio.src) {
      return;
    }

    if (state.playerState === PLAYER_IDLE && !audio.paused) {
      audio.pause();
    } else if (state.playerState === PLAYER_ACTIVE && audio.paused) {
      audio.play();
    }
    return;
  }

  if (audio.src && !audio.paused) {
    audio.pause();
  }
  if (state.currentTrack.src) {
    audio.src = `/audio/${state.currentTrack.src}`;
    audio.load();
    audio.play();
  } else {
    // eslint-disable-next-line
    delete audio.src;
  }
  track = state.currentTrack.trackId;
};

export default (store = null) => {
  if (isServer) {
    return audio;
  }
  if (!audio) {
    audio = document.createElement('audio');
  }
  if (store) {
    audio.ontimeupdate = () => (
      store.dispatch(setTrackInfo(audio.currentTime, audio.duration))
    );
    store.subscribe(() => listener(store.getState()));
  }
  return audio;
};
