import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import ArtistType from './Artist';
import AlbumType from './Album';
import TrackType from './Track';
import CollectionType from './Collection';
import TrackCollectionType from './Track/Collection';
import ArtistCollectionType from './Artist/Collection';
import { nodeField } from './relayNode';
import api from '../../database';

export class Album {}
export class BrowseAlbum {}
export class Artist {}
export class AlbumArtist {}
export class Track {}
export class AlbumTrack {}

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
    artist: {
      type: ArtistType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (_, args) => args.id && api.getArtist(args.id),
    },
    track: {
      type: TrackType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (_, args) => args.id && api.getTrack(args.id),
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
