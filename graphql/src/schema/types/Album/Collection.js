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
        q: { type: GraphQLString },
      },
      resolve: (_, args) => {
        if (args.type === 'albumSearch') {
          if (args.q) {
            return api.getAlbumSearch(args.q).then(albums => albums.items);
          }
          return [];
        }
        return api.getArtistAlbums(_.results).then(albums => albums.items);
      },
    },
  },
});

export default AlbumCollectionType;
