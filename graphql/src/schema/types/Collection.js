import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import api from '../../database';
import BrowseAlbumType from './Album/Browse';

const CollectionType = new GraphQLObjectType({
  name: 'Collection',
  description: 'A list of results.',
  fields: {
    results: {
      type: new GraphQLList(BrowseAlbumType),
      description: 'Currently, a list of albums.',
      args: {
        sort: { type: GraphQLString },
        limit: { type: GraphQLInt },
        type: { type: GraphQLString },
      },
      resolve: (_, args) => {
        if (args.type === 'newReleases') {
          return api.getNewReleases(args.limit).then(({ results }) => results);
        } else if (args.type === 'artistAlbums') {
          return api.getArtistAlbums(_.results);
        }

        return [];
      },
    },
  },
});

export default CollectionType;
