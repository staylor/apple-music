import { setTrackInfo } from '../actions';
import { PLAYER_IDLE, PLAYER_ACTIVE } from '../reducers/player';

let audio = null;
let track = 0;
let currentVolume;
let fadeInInterval;
let fadeOutInterval;

const isServer = typeof document === 'undefined';
const interval = 200;

const fadeEdges = () => {
  window.clearInterval(fadeInInterval);
  window.clearInterval(fadeOutInterval);

  // we know that this is a deliberate action
  // fade in the track
  currentVolume = audio.volume || 0.5;
  audio.volume = 0;

  fadeInInterval = window.setInterval(() => {
    if (audio.volume >= 1 || audio.volume >= currentVolume) {
      window.clearInterval(fadeInInterval);
      return;
    }
    audio.volume = Math.min(1, audio.volume + 0.1);
  }, interval);

  // set up a 2-second fade out
  fadeOutInterval = window.setInterval(() => {
    if ((audio.currentTime >= (audio.duration - 2)) && audio.volume !== 0.0) {
      audio.volume -= 0.1;
    }
    if (audio.volume === 0.0) {
      window.clearInterval(fadeOutInterval);
    }
  }, interval);
};

const listener = (state) => {
  if (isServer || !state) {
    return;
  }

  if (track === state.currentTrack.track_id) {
    if (!audio.src) {
      return;
    }

    if (state.playerState === PLAYER_IDLE && !audio.paused) {
      audio.pause();
    } else if (state.playerState === PLAYER_ACTIVE && audio.paused) {
      audio.play();
      fadeEdges();
    }
    return;
  }

  if (audio.src && !audio.paused) {
    audio.pause();
  }
  if (state.currentTrack.preview_url) {
    audio.src = state.currentTrack.preview_url;
    audio.load();
    audio.play();
    fadeEdges();
  } else {
    Reflect.deleteProperty(audio, 'src');
  }
  track = state.currentTrack.track_id;
};

export default (store = null) => {
  if (isServer) {
    return audio;
  }
  if (!audio) {
    audio = document.createElement('audio');
    audio.loop = false;
  }
  if (store) {
    audio.ontimeupdate = () => (
      store.dispatch(setTrackInfo(audio.currentTime, audio.duration))
    );
    store.subscribe(() => listener(store.getState()));
  }
  return audio;
};
