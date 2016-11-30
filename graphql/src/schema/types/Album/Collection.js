// @flow

import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} from 'graphql';

import api from '~/database';
import BrowseAlbumType from './Browse';

const AlbumCollectionType = new GraphQLObjectType({
  name: 'AlbumCollection',
  description: 'A list of results.',
  fields: {
    results: {
      type: new GraphQLList(BrowseAlbumType),
      description: 'Currently, a list of albums.',
      args: {
        type: { type: GraphQLString },
      },
      resolve: _ => api.getArtistAlbums(_.results).then(albums => albums.items),
    },
  },
});

export default AlbumCollectionType;
