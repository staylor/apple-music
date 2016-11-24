import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import {
  globalIdField,
  fromGlobalId,
  nodeDefinitions,
  connectionDefinitions,
} from 'graphql-relay';

import ImageType from './Image';
import URLMapType from './URLMap';
import FollowersType from './Followers';
import { ArtistLoader } from '../../database';

const ArtistType = new GraphQLObjectType({
  name: 'Artist',
  description: 'An artist in the catalog',
  fields: () => ({
    id: globalIdField('Artist'),
    // eslint-disable-next-line no-use-before-define
    node: nodeField,

    artistId: {
      type: GraphQLString,
      description: 'The id of the artist.',
      resolve: artist => artist.id,
    },
    external_urls: {
      type: URLMapType,
      description: 'External URLs for the artist.',
    },
    followers: {
      type: FollowersType,
      description: 'Follower info for the artist.',
    },
    genres: {
      type: new GraphQLList(GraphQLString),
      description: 'The genres for the artist.',
    },
    href: {
      type: GraphQLString,
      description: 'The Spotify web URL for the artist.',
    },
    images: {
      type: new GraphQLList(ImageType),
      description: 'The genres for the artist.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the artist.',
    },
    type: {
      type: GraphQLString,
      description: 'The type of object (usually: "artist").',
    },
    popularity: {
      type: GraphQLInt,
      description: 'The popularity ranking of the artist.',
    },
    uri: {
      type: GraphQLString,
      description: 'The Spotify URI for the artist.',
    },
  }),
  // eslint-disable-next-line no-use-before-define
  interfaces: [nodeInterface],
});

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { id } = fromGlobalId(globalId);
    return ArtistLoader.load(id);
  },
  () => ArtistType
);

const defs = connectionDefinitions({ nodeType: ArtistType });

export const ArtistEdge = defs.edgeType;
export const ArtistConnection = defs.connectionType;

export default ArtistType;
