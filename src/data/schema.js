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

import Store from '../flux/Store';

/* eslint-disable no-use-before-define */

const store = Store.getData();

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'Album') {
      return Store.albumById(id);
    } else if (type === 'Artist') {
      return Store.artistById(id);
    } else if (type === 'Track') {
      return Store.trackById(id);
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
        disc.tracks.map(id => Store.trackById(id)),
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
        artist.albums.map(id => Store.albumById(id)),
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
        [Store.artistById(album.artist)],
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
        results: store.catalog.albums,
      }),
    },
    album: {
      type: AlbumType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (_, args) => Store.albumById(args.id),
    },
    artist: {
      type: ArtistType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (_, args) => Store.artistById(args.id),
    },
    track: {
      type: TrackType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (_, args) => Store.trackById(args.id),
    },
    currentAlbum: {
      type: AlbumType,
      resolve: () => Store.getCurrentAlbum(),
    },
    currentTrack: {
      type: TrackType,
      resolve: () => Store.getCurrentTrack(),
    },
    node: nodeField,
  }),
});

const schema = new GraphQLSchema({
  query: Root,
});

export default schema;
