// @flow

import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import { globalIdField } from 'graphql-relay';
import ImageType from '../Image';
import FollowersType from './Followers';
import { ArtistInterfaceType, ArtistFields } from './ArtistInterface';
import { Artist } from '../Root';
import { nodeInterface } from '../relayNode';

const ArtistType = new GraphQLObjectType({
  name: 'Artist',
  interfaces: () => [ArtistInterfaceType, nodeInterface],
  description: 'An artist in the catalog',
  isTypeOf(value) {
    return value instanceof Artist;
  },
  fields: () => ({
    id: globalIdField('Artist'),
    ...ArtistFields,
    followers: {
      type: FollowersType,
      description: 'Follower info for the artist.',
    },
    genres: {
      type: new GraphQLList(GraphQLString),
      description: 'The genres for the artist.',
    },
    images: {
      type: new GraphQLList(ImageType),
      description: 'The genres for the artist.',
    },
    popularity: {
      type: GraphQLInt,
      description: 'The popularity ranking of the artist.',
    },
  }),
});

export default ArtistType;
