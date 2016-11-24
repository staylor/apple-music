import Dataloader from 'dataloader';
import Spotify from './providers/Spotify';

const api = new Spotify();

const batcher = resolver => ids => ids.map(id => resolver(id));

export const AlbumLoader = new Dataloader(batcher(api.getAlbum));
export const ArtistLoader = new Dataloader(batcher(api.getArtist));
export const TrackLoader = new Dataloader(batcher(api.getTrack));

export default api;
