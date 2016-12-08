// @flow

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
import CollectionType from './Collection';

import { AlbumLoader, ArtistLoader, TrackLoader } from '~/database';

import {
  Album,
  AlbumArtist,
  AlbumTrack,
  BrowseAlbum,
  Artist,
  Track,
} from '~/models';

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);

    switch (type) {
      case 'Album':
        return AlbumLoader.load(id);
      case 'BrowseAlbum':
        return AlbumLoader.load(id);
      case 'Artist':
        return ArtistLoader.load(id);
      case 'AlbumArtist':
        return ArtistLoader.load(id);
      case 'Track':
        return TrackLoader.load(id);
      case 'AlbumTrack':
        return TrackLoader.load(id);
      case 'Collection':
        return { results: {} };
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
        return CollectionType;
    }
  }
);

export { nodeInterface, nodeField };
