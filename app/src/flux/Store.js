import { EventEmitter } from 'fbemitter';
import catalog from '../../../graphql/src/data/catalog';
import { TrackLoader } from '../../../graphql/src/database';

const langs = {};
let data = {
  locale: 'en',
  track: null,
  currentTime: 0,
  catalog,
};
let audio;

const emitter = new EventEmitter();

const Store = {
  AUDIO_PATH: '/audio/',

  async setAudio() {
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

  getAudio() {
    if (audio) {
      return audio;
    }

    this.setAudio();

    return audio;
  },

  getData() {
    return data;
  },

  set(key, value) {
    data[key] = value;
    emitter.emit(`change:${key}`, value);
    emitter.emit('change', value);
  },

  setData(newData) {
    data = newData;
    emitter.emit('change', newData);
  },

  addListener(eventType, fn) {
    return emitter.addListener(eventType, fn);
  },

  change() {
    emitter.emit('change', data);
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
