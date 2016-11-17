import cookie from 'react-cookie';
import { EventEmitter } from 'fbemitter';
import catalog from '../../../data/catalog';

const langs = {};
let data = {
  locale: 'en',
  track: cookie.load('track'),
  album: cookie.load('album'),
  currentTime: null,
  catalog,
};
let audio;
const albumsById = {};
const artistsById = {};
const tracksById = {};

const emitter = new EventEmitter();

const Store = {
  AUDIO_PATH: '/audio/',

  setAudio() {
    if (typeof window === 'undefined') {
      return;
    }

    audio = document.createElement('audio');
    if (data.track) {
      const track = this.trackById(data.track);
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

    langs[locale] = require(`../langs/${locale}.js`).default;

    return langs[locale];
  },

  albumById(albumId) {
    albumId = parseInt(albumId, 10);
    if (albumsById[albumId]) {
      return albumsById[albumId];
    }

    if (!data.catalog) {
      return null;
    }

    const album = data.catalog.albums.find(currentAlbum => currentAlbum.albumId === albumId);
    albumsById[albumId] = album;
    return album;
  },

  artistById(artistId) {
    artistId = parseInt(artistId, 10);
    if (artistsById[artistId]) {
      return artistsById[artistId];
    }

    if (!data.catalog) {
      return null;
    }

    const artist = data.catalog.artists.find(currentArtist => currentArtist.artistId === artistId);
    artistsById[artistId] = artist;
    return artist;
  },

  trackById(trackId) {
    trackId = parseInt(trackId, 10);
    if (tracksById[trackId]) {
      return tracksById[trackId];
    }

    if (!data.catalog) {
      return null;
    }

    const artist = data.catalog.tracks.find(track => track.trackId === trackId);
    tracksById[trackId] = artist;
    return artist;
  },

  getCurrentAlbum() {
    const albumId = cookie.load('album');
    if (albumId) {
      return this.albumById(albumId);
    }
    return null;
  },

  getCurrentTrack() {
    const trackId = cookie.load('track');
    if (trackId) {
      return this.trackById(trackId);
    }
    return null;
  },

  getAlbums() {
    return data.catalog.albums;
  },

  getArtists() {
    return data.catalog.artists;
  },

  getTracks() {
    return data.catalog.tracks;
  },
};

export default Store;
