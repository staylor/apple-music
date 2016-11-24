import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import ArtistType from './Artist';
import TrackType from './Track';
import AlbumType from './Album';
import CollectionType from './Collection';

import api, { AlbumLoader, ArtistLoader, TrackLoader } from '../../database';

const Root = new GraphQLObjectType({
  name: 'Root',
  fields: () => ({
    newReleases: {
      type: CollectionType,
      resolve: () => api.getNewReleases(),
    },
    album: {
      type: AlbumType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (_, args) => args.id && AlbumLoader.load(args.id),
    },
    artist: {
      type: ArtistType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (_, args) => args.id && ArtistLoader.load(args.id),
    },
    track: {
      type: TrackType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (_, args) => args.id && TrackLoader.load(args.id),
    },
  }),
});

export default Root;
