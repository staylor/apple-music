import Dataloader from 'dataloader';
import catalog, { albums, artists, tracks } from './data/catalog';

const data = {
  catalog,
};
const db = {
  catalog: data.catalog,

  albumById(albumId) {
    albumId = parseInt(albumId, 10);
    if (!albumId) {
      return null;
    }
    return albums.find(currentAlbum => currentAlbum.albumId === albumId);
  },

  artistById(artistId) {
    artistId = parseInt(artistId, 10);
    if (!artistId) {
      return null;
    }
    return artists.find(currentArtist => currentArtist.artistId === artistId);
  },

  trackById(trackId) {
    trackId = parseInt(trackId, 10);
    if (!trackId) {
      return null;
    }
    return tracks.find(track => track.trackId === trackId);
  },

  getAlbums() {
    return albums;
  },

  getArtists() {
    return artists;
  },

  getTracks() {
    return tracks;
  },
};

const batcher = resolver => (ids => (new Promise((resolve) => {
  const hydratedData = ids.map(resolver);
  resolve(hydratedData);
})));

export const AlbumLoader = new Dataloader(batcher(db.albumById));
export const ArtistLoader = new Dataloader(batcher(db.artistById));
export const TrackLoader = new Dataloader(batcher(db.trackById));

export default db;
