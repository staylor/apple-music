// @flow

import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} from 'graphql';

import api from '~/database';
import ArtistType from './index';

const ArtistCollectionType = new GraphQLObjectType({
  name: 'ArtistCollection',
  description: 'A list of results.',
  fields: {
    results: {
      type: new GraphQLList(ArtistType),
      description: 'Currently, a list of artists.',
      args: {
        artistType: { type: GraphQLString },
      },
      resolve: _ => api.getArtistRelated(_.results),
    },
  },
});

export default ArtistCollectionType;
