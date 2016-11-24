import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import ArtistType from './Artist';
import TrackType from './Track';
import AlbumType from './Album';
import CollectionType from './Collection';

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
