import querystring from 'querystring';
import fetch from 'node-fetch';
import NodeCache from 'node-cache';

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
    return this.doFetch(newReleasesUrl).then(json => ({
      results: json.albums.items,
    }));
  }

  getAlbum(id) {
    return this.doFetch(`${albumUrl}${id}`);
  }

  getAlbumSearch(term) {
    const qs = querystring.stringify({
      type: 'album',
      q: term,
    });
    return this.doFetch(`${searchUrl}?${qs}`);
  }

  getArtist(id) {
    return this.doFetch(`${artistUrl}${id}`);
  }

  getArtistAlbums(id) {
    return this.doFetch(`${artistUrl}${id}/albums`);
  }

  getArtistTracks(id) {
    return this.doFetch(`${artistUrl}${id}/top-tracks`);
  }

  getArtistRelated(id) {
    return this.doFetch(`${artistUrl}${id}/related-artists`);
  }

  getArtistSearch(term) {
    const qs = querystring.stringify({
      type: 'artist',
      q: term,
    });
    return this.doFetch(`${searchUrl}?${qs}`);
  }

  // eslint-disable-next-line
  getTrack(id) {
    return this.doFetch(`${trackUrl}${id}`);
  }

  getTrackSearch(term) {
    const qs = querystring.stringify({
      type: 'track',
      q: term,
    });
    return this.doFetch(`${searchUrl}?${qs}`);
  }
}

export default Spotify;