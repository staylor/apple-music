import Dataloader from 'dataloader';
import Spotify from './providers/Spotify';

const api = new Spotify();

export const AlbumLoader = new Dataloader(ids => Promise.all(ids.map(id => api.getAlbum(id))));
export const ArtistLoader = new Dataloader(ids => Promise.all(ids.map(id => api.getArtist(id))));
export const TrackLoader = new Dataloader(ids => Promise.all(ids.map(id => api.getTrack(id))));

export default api;
