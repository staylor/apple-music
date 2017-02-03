// @flow

import {
  Album,
  BrowseAlbum,
  Artist,
  AlbumArtist,
  Track,
  AlbumTrack,
} from '../models';

const coerce = {
  setArtist: (data: Object) => (Object.assign(new Artist(), data)),
  setAlbumArtist: (data: Object) => (Object.assign(new AlbumArtist(), data)),
  setAlbum: (data: Object) => (Object.assign(new Album(), data)),
  setBrowseAlbum: (data: Object) => (Object.assign(new BrowseAlbum(), data)),
  setTrack: (data: Object) => (Object.assign(new Track(), data)),
  setAlbumTrack: (data: Object) => (Object.assign(new AlbumTrack(), data)),
  walk: (data: any) => {
    Object.keys(data).forEach((key) => {
      switch (key) {
        case 'album':
          data[key] = coerce.setBrowseAlbum(coerce.walk(data[key]));
          break;
        case 'artists':
          data[key] = data[key].map(artist => coerce.setAlbumArtist(artist));
          break;
        case 'tracks':
          data[key].items = data[key].items.map(track => coerce.setAlbumTrack(coerce.walk(track)));
          break;
        default:
          break;
      }
    });
    return data;
  },
};

export default coerce;
