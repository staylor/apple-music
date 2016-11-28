import {
  nodeDefinitions,
  fromGlobalId,
} from 'graphql-relay';

import AlbumType from './Album';
import BrowseAlbumType from './Album/Browse';
import ArtistType from './Artist';
import AlbumArtistType from './Artist/AlbumArtist';
import AlbumTrackType from './Track/AlbumTrack';
import TrackType from './Track';

import api, {
  Album,
  AlbumArtist,
  AlbumTrack,
  BrowseAlbum,
  Artist,
  Track,
} from './Root';

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);

    switch (type) {
      case 'Album':
        return api.getAlbum(id);
      case 'BrowseAlbum':
        return api.getAlbum(id);
      case 'Artist':
        return api.getArtist(id);
      case 'AlbumArtist':
        return api.getArtist(id);
      case 'Track':
        return api.getTrack(id);
      case 'AlbumTrack':
        return api.getTrack(id);
      default:
        return null;
    }
  },
  (obj) => {
    switch (true) {
      case obj instanceof Album:
        return AlbumType;
      case obj instanceof BrowseAlbum:
        return BrowseAlbumType;
      case obj instanceof Artist:
        return ArtistType;
      case obj instanceof AlbumArtist:
        return AlbumArtistType;
      case obj instanceof Track:
        return TrackType;
      case obj instanceof AlbumTrack:
        return AlbumTrackType;
      default:
        return null;
    }
  }
);

export { nodeInterface, nodeField };
