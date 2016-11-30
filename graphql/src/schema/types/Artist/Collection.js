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
        type: { type: GraphQLString },
        q: { type: GraphQLString },
      },
      resolve: (_, args) => {
        if (args.type === 'artistSearch') {
          if (args.q) {
            return api.getArtistSearch(args.q).then(artists => artists.items);
          }
          return [];
        }
        return api.getArtistRelated(_.results);
      },
    },
  },
});

export default ArtistCollectionType;
