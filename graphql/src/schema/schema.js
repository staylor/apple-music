import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  globalIdField,
  fromGlobalId,
  nodeDefinitions,
  connectionDefinitions,
  connectionArgs,
  connectionFromArray,
} from 'graphql-relay';

import db, { AlbumLoader, ArtistLoader, TrackLoader } from '../database';

/* eslint-disable no-use-before-define */

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'Album') {
      return AlbumLoader.load(id);
    } else if (type === 'Artist') {
      return ArtistLoader.load(id);
    } else if (type === 'Track') {
      return TrackLoader.load(id);
    }
    return null;
  },

  (obj) => {
    if (obj instanceof AlbumType) {
      return AlbumType;
    } else if (obj instanceof ArtistType) {
      return ArtistType;
    } else if (obj instanceof TrackType) {
      return TrackType;
    }
    return null;
  }
);

const TrackType = new GraphQLObjectType({
  name: 'Track',
  fields: () => ({
    id: globalIdField('Track'),
    trackId: {
      type: GraphQLInt,
      description: 'The id of the track.',
    },
    number: {
      type: GraphQLInt,
      description: 'The play index of the track.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the track.',
    },
    length: {
      type: GraphQLString,
      description: 'The formatted length of the track.',
    },
    src: {
      type: GraphQLString,
      description: 'The relative path to the source audio for the track.',
    },
  }),
  interfaces: [nodeInterface],
});

const DiscType = new GraphQLObjectType({
  name: 'Disc',
  fields: () => ({
    number: { type: GraphQLInt },
    tracks: {
      type: TrackConnection,
      description: 'A list of tracks.',
      args: connectionArgs,
      resolve: (disc, args) => connectionFromArray(
        disc.tracks.map(id => TrackLoader.load(id)),
        args
      ),
    },
  }),
});

const ArtistType = new GraphQLObjectType({
  name: 'Artist',
  description: 'An artist in the catalog',
  fields: () => ({
    id: globalIdField('Artist'),
    artistId: {
      type: GraphQLInt,
      description: 'The id of the artist.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the artist.',
    },
    albums: {
      type: AlbumConnection,
      description: 'Albums by the artist.',
      args: connectionArgs,
      resolve: (artist, args) => connectionFromArray(
        artist.albums.map(id => AlbumLoader.load(id)),
        args
      ),
    },
  }),
  interfaces: [nodeInterface],
});

const AlbumType = new GraphQLObjectType({
  name: 'Album',
  description: 'An album in the catalog',
  fields: () => ({
    id: globalIdField('Album'),
    albumId: {
      type: GraphQLInt,
      description: 'The id of the album.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the album.',
    },
    artist: {
      type: ArtistConnection,
      description: 'The name of the artist who created the album.',
      args: connectionArgs,
      resolve: (album, args) => connectionFromArray(
        [ArtistLoader.load(album.artist)],
        args
      ),
    },
    genre: {
      type: GraphQLString,
      description: 'The genre of the album.',
    },
    year: {
      type: GraphQLInt,
      description: 'The year the album was released.',
    },
    length: {
      type: GraphQLString,
      description: 'The formatted length of the album.',
    },
    image: {
      type: GraphQLString,
      description: 'The relative path of the cover image source.',
    },
    discs: {
      type: new GraphQLList(DiscType),
      description: 'Discs containing tracks. Most albums contain only one disc.',
    },
  }),
  interfaces: [nodeInterface],
});

const {
  // eslint-disable-next-line no-unused-vars
  edgeType: ArtistEdge,
  connectionType: ArtistConnection,
} = connectionDefinitions({ nodeType: ArtistType });

const {
  // eslint-disable-next-line no-unused-vars
  edgeType: AlbumEdge,
  connectionType: AlbumConnection,
} = connectionDefinitions({ nodeType: AlbumType });

const {
  // eslint-disable-next-line no-unused-vars
  edgeType: TrackEdge,
  connectionType: TrackConnection,
} = connectionDefinitions({ nodeType: TrackType });

const CollectionType = new GraphQLObjectType({
  name: 'Collection',
  description: 'A list of results.',
  fields: {
    results: {
      type: new GraphQLList(AlbumType),
      description: 'Currently, a list of albums.',
    },
  },
});

const Root = new GraphQLObjectType({
  name: 'Root',
  fields: () => ({
    albums: {
      type: CollectionType,
      resolve: () => ({
        results: db.getAlbums(),
      }),
    },
    album: {
      type: AlbumType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (_, args) => args.id && AlbumLoader.load(args.id),
    },
    artist: {
      type: ArtistType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (_, args) => args.id && ArtistLoader.load(args.id),
    },
    track: {
      type: TrackType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (_, args) => args.id && TrackLoader.load(args.id),
    },
    node: nodeField,
  }),
});

const Schema = new GraphQLSchema({
  query: Root,
});

export default Schema;
