// @flow

import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} from 'graphql';

import { globalIdField } from 'graphql-relay';

import api from '../../database';
import BrowseAlbumType from './Album/Browse';

const CollectionType = new GraphQLObjectType({
  name: 'Collection',
  description: 'A list of results.',
  fields: {
    id: globalIdField('Collection'),
    results: {
      type: new GraphQLList(BrowseAlbumType),
      description: 'Currently, a list of albums.',
      args: {
        type: { type: GraphQLString },
      },
      resolve: (_, args) => {
        if (args.type === 'newReleases') {
          return api.getNewReleases();
        } else if (args.type === 'artistAlbums') {
          return api.getArtistAlbums(_.results);
        }

        return [];
      },
    },
  },
});

export default CollectionType;
