import cookie from 'react-cookie';
import { EventEmitter } from 'fbemitter';
import catalog from '../../../graphql/src/data/catalog';
import { TrackLoader } from '../../../graphql/src/database';

const langs = {};
let data = {
  locale: 'en',
  track: cookie.load('track'),
  album: cookie.load('album'),
  currentTime: null,
  catalog,
};
let audio;

const emitter = new EventEmitter();

const Store = {
  AUDIO_PATH: '/audio/',

  async setAudio(setSrc = true) {
    if (typeof window === 'undefined') {
      return;
    }

    audio = document.createElement('audio');
    if (data.track) {
      const track = await (TrackLoader.load(data.track));
      audio.src = `${this.AUDIO_PATH}${track.src}`;
    }

    audio.ontimeupdate = (event) => {
      Store.set('currentTime', event.timeStamp);
    };
  },

  getAudio(setSrc = true) {
    if (audio) {
      return audio;
    }

    this.setAudio(setSrc);

    return audio;
  },

  getData() {
    return data;
  },

  set(key, value) {
    data[key] = value;
    emitter.emit(`change:${key}`);
    emitter.emit('change');
  },

  setData(newData) {
    data = newData;
    emitter.emit('change');
  },

  addListener(eventType, fn) {
    return emitter.addListener(eventType, fn);
  },

  change() {
    emitter.emit('change');
  },

  getLocale() {
    return data.locale;
  },

  getMessages() {
    const locale = this.getLocale();

    if (langs[locale]) {
      return langs[locale];
    }
    /* eslint-disable global-require */
    /* eslint-disable import/no-dynamic-require */
    langs[locale] = require(`../langs/${locale}.js`).default;

    return langs[locale];
  },
};

export default Store;
