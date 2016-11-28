import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import ArtistType from './Artist';
import AlbumType from './Album';
import TrackType from './Track';
import CollectionType from './Collection';
import TrackCollectionType from './Track/Collection';

import api from '../../database';

const Root = new GraphQLObjectType({
  name: 'Root',
  fields: () => ({
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
    artist: {
      type: ArtistType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (_, args) => args.id && api.getArtist(args.id),
    },
    artistAlbums: {
      type: CollectionType,
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
    track: {
      type: TrackType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (_, args) => args.id && api.getTrack(args.id),
    },
  }),
});

export default Root;
