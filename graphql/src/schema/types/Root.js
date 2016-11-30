// @flow

import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import ArtistType from './Artist';
import AlbumType from './Album';
import TrackType from './Track';
import CollectionType from './Collection';
import AlbumCollectionType from './Album/Collection';
import TrackCollectionType from './Track/Collection';
import ArtistCollectionType from './Artist/Collection';
import { nodeField } from './relayNode';
import api from '~/database';

const Root = new GraphQLObjectType({
  name: 'Root',
  fields: () => ({
    node: nodeField,
    newReleases: {
      type: CollectionType,
      resolve: () => ({
        results: {},
      }),
    },
    album: {
      type: AlbumType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (_, args) => args.id && api.getAlbum(args.id),
    },
    albumSearch: {
      type: AlbumCollectionType,
      resolve: () => ({
        results: {},
      }),
    },
    track: {
      type: TrackType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (_, args) => args.id && api.getTrack(args.id),
    },
    trackSearch: {
      type: TrackCollectionType,
      resolve: () => ({
        results: {},
      }),
    },
    // Artist
    artist: {
      type: ArtistType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (_, args) => args.id && api.getArtist(args.id),
    },
    artistSearch: {
      type: ArtistCollectionType,
      resolve: () => ({
        results: {},
      }),
    },
    artistAlbums: {
      type: AlbumCollectionType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (_, args) => ({
        results: args.id,
      }),
    },
    topTracks: {
      type: TrackCollectionType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (_, args) => ({
        results: args.id,
      }),
    },
    relatedArtists: {
      type: ArtistCollectionType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (_, args) => ({
        results: args.id,
      }),
    },
  }),
});

export default Root;
