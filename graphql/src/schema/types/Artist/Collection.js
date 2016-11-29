import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} from 'graphql';

import api from '../../../database';
import ArtistType from './index';

const AlbumCollectionType = new GraphQLObjectType({
  name: 'ArtistCollection',
  description: 'A list of results.',
  fields: {
    results: {
      type: new GraphQLList(ArtistType),
      description: 'Currently, a list of artists.',
      args: {
        artistType: { type: GraphQLString },
      },
      resolve: (_, args) => {
        if (args.artistType === 'related') {
          return api.getArtistRelated(_.results);
        }
        return [];
      },
    },
  },
});

export default AlbumCollectionType;
