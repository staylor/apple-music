// @flow

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

const setFullArtist = data => Object.assign(new Artist(), data);
const setArtist = data => Object.assign(new AlbumArtist(), data);
const setFullAlbum = data => Object.assign(new Album(), data);
const setAlbum = data => Object.assign(new BrowseAlbum(), data);
const setFullTrack = data => Object.assign(new Track(), data);
const setTrack = data => Object.assign(new AlbumTrack(), data);

const coerceData = (data) => {
  Object.keys(data).forEach((key) => {
    switch (key) {
      case 'album':
        data[key] = setAlbum(coerceData(data[key]));
        break;
      case 'artists':
        data[key] = data[key].map(artist => setArtist(artist));
        break;
      case 'tracks':
        data[key].items = data[key].items.map(track => setTrack(coerceData(track)));
        break;
      default:
        break;
    }
  });
  return data;
};

/* eslint-disable no-console */

const tokenKey = 'spotify:token';
let cache;

class Spotify {
  constructor() {
    cache = new NodeCache();
  }

  static getToken(): Promise<string> {
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

  doFetch(url: string, args?: Object): Promise<Object> {
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

  getNewReleases(): Promise<Album[]> {
    const qs = querystring.stringify({
      market: 'US',
      limit: 50,
    });
    return this.doFetch(`${newReleasesUrl}?${qs}`)
      .then(json => json.albums.items)
      .then(items => items.map(item => setAlbum(coerceData(item))));
  }

  getAlbum(id: string): Promise<Album> {
    return this.doFetch(`${albumUrl}${id}`)
      .then(album => setFullAlbum(coerceData(album)));
  }

  getAlbumSearch(term: string): Promise<Object> {
    const qs = querystring.stringify({
      type: 'album',
      q: term,
      market: 'US',
    });
    return this.doFetch(`${searchUrl}?${qs}`);
  }

  getArtist(id: string): Promise<Artist> {
    return this.doFetch(`${artistUrl}${id}`)
      .then(artist => setFullArtist(artist));
  }

  getArtistAlbums(id: string): Promise<BrowseAlbum[]> {
    const qs = querystring.stringify({ market: 'US' });
    return this.doFetch(`${artistUrl}${id}/albums?${qs}`)
      .then(json => json.items)
      .then(items => items.map(item => setAlbum(coerceData(item))));
  }

  getArtistTracks(id: string): Promise<Track[]> {
    const qs = querystring.stringify({ country: 'US' });
    return this.doFetch(`${artistUrl}${id}/top-tracks?${qs}`)
      .then(json => json.tracks)
      .then(tracks => tracks.map(track => setFullTrack(coerceData(track))));
  }

  getArtistRelated(id: string): Promise<Artist[]> {
    return this.doFetch(`${artistUrl}${id}/related-artists`)
      .then(json => json.artists)
      .then(artists => artists.map(artist => setFullArtist(artist)));
  }

  getArtistSearch(term: string): Promise {
    const qs = querystring.stringify({
      type: 'artist',
      q: term,
      market: 'US',
    });
    return this.doFetch(`${searchUrl}?${qs}`);
  }

  getTrack(id: string): Promise {
    return this.doFetch(`${trackUrl}${id}`);
  }

  getTrackSearch(term: string): Promise {
    const qs = querystring.stringify({
      type: 'track',
      q: term,
      market: 'US',
    });
    return this.doFetch(`${searchUrl}?${qs}`);
  }
}

export default Spotify;
