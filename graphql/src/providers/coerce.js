import {
  Album,
  BrowseAlbum,
  Artist,
  AlbumArtist,
  Track,
  AlbumTrack,
} from '../schema/types/Root';

const coerce = {
  setArtist: data => (Object.assign(new Artist(), data)),
  setAlbumArtist: data => (Object.assign(new AlbumArtist(), data)),
  setAlbum: data => (Object.assign(new Album(), data)),
  setBrowseAlbum: data => (Object.assign(new BrowseAlbum(), data)),
  setTrack: data => (Object.assign(new Track(), data)),
  setAlbumTrack: data => (Object.assign(new AlbumTrack(), data)),
  walk: (data) => {
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
