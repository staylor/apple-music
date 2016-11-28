import querystring from 'querystring';
import fetch from 'node-fetch';
import NodeCache from 'node-cache';

import {
  Album,
  BrowseAlbum,
  Artist,
  AlbumArtist,
  Track,
  AlbumTrack,
} from '../schema/types/Root';

const clientId = 'b791653f8886473db15526cc8ea24588';
const clientSecret = 'fddc22b8fd85445db6477b5fe502ab90';
const tokenUrl = 'https://accounts.spotify.com/api/token';

const apiHost = 'https://api.spotify.com/v1';
const newReleasesUrl = `${apiHost}/browse/new-releases`;
const albumUrl = `${apiHost}/albums/`;
const artistUrl = `${apiHost}/artists/`;
const trackUrl = `${apiHost}/tracks/`;
const searchUrl = `${apiHost}/search`;

/* eslint-disable no-console */

const tokenKey = 'spotify:token';
let cache;

class Spotify {
  constructor() {
    cache = new NodeCache();
  }

  static getToken() {
    return new Promise((resolve, reject) => (
      cache.get(tokenKey, (err, value) => {
        if (err) {
          console.warn(`CACHE ERROR: ${tokenKey}`);
          reject(err);
          return err;
        }

        if (value) {
          console.log(`CACHE HIT: ${value}`);
          resolve(value);
          return value;
        }

        const auth = new Buffer(`${clientId}:${clientSecret}`).toString('base64');

        return fetch(tokenUrl, {
          method: 'POST',
          body: 'grant_type=client_credentials',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${auth}`,
          },
        })
          .catch(error => reject(error))
          .then(response => response.json())
          .then((json) => {
            cache.set(
              tokenKey,
              json.access_token,
              json.expires_in
            );

            resolve(json.access_token);
            return json.access_token;
          });
      })
    ));
  }

  doFetch(url, args) {
    return Spotify.getToken().then((token) => {
      let headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      };
      if (args && args.headers) {
        headers = Object.assign({}, headers, args.headers);
        Reflect.deleteProperty(args, 'headers');
      }

      const mergedArgs = Object.assign({}, {
        headers,
        ...args,
      });

      return Reflect.apply(fetch, this, [url, mergedArgs])
        .then(response => response.json())
        .catch(err => console.log('ERROR', err));
    });
  }

  getNewReleases() {
    const qs = querystring.stringify({
      market: 'US',
      limit: 50,
    });
    return this.doFetch(`${newReleasesUrl}?${qs}`)
      .then(json => json.albums.items)
      .then(items => items.map(item => Object.create(BrowseAlbum, item)));
  }

  getAlbum(id) {
    return this.doFetch(`${albumUrl}${id}`)
      .then(album => album.tracks.map(track => Object.create(AlbumTrack, track)))
      .then(album => Object.create(Album, album));
  }

  getAlbumSearch(term) {
    const qs = querystring.stringify({
      type: 'album',
      q: term,
      market: 'US',
    });
    return this.doFetch(`${searchUrl}?${qs}`);
  }

  getArtist(id) {
    return this.doFetch(`${artistUrl}${id}`)
      .then(artist => Object.create(Artist, artist));
  }

  getArtistAlbums(id) {
    const qs = querystring.stringify({ market: 'US' });
    return this.doFetch(`${artistUrl}${id}/albums?${qs}`)
      .then(json => json.items)
      .then(items => items.map(item => Object.create(BrowseAlbum, item)));
  }

  getArtistTracks(id) {
    const qs = querystring.stringify({ country: 'US' });
    return this.doFetch(`${artistUrl}${id}/top-tracks?${qs}`)
      .then(json => json.tracks)
      .then(tracks => tracks.map(track => (
        track.artists.map(artist => Object.create(AlbumArtist, artist))
      )))
      .then(tracks => tracks.map(track => (track.album = Object.create(BrowseAlbum, track.album))))
      .then(tracks => tracks.map(track => Object.create(Track, track)));
  }

  getArtistRelated(id) {
    return this.doFetch(`${artistUrl}${id}/related-artists`);
  }

  getArtistSearch(term) {
    const qs = querystring.stringify({
      type: 'artist',
      q: term,
      market: 'US',
    });
    return this.doFetch(`${searchUrl}?${qs}`);
  }

  getTrack(id) {
    return this.doFetch(`${trackUrl}${id}`);
  }

  getTrackSearch(term) {
    const qs = querystring.stringify({
      type: 'track',
      q: term,
      market: 'US',
    });
    return this.doFetch(`${searchUrl}?${qs}`);
  }
}

export default Spotify;
