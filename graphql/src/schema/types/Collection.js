import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import api from '../../database';
import BrowseAlbumType from './Album/Browse';

const artistNameFilter = (a, b) => {
  const aNode = a.artists[0].name;
  const bNode = b.artists[0].name;

  if (aNode < bNode) {
    return -1;
  }
  if (aNode > bNode) {
    return 1;
  }
  return 0;
};

const filters = {
  popular: {
    filter: (a, b) => {
      const field = 'popularity';
      if (a[field] < b[field]) {
        return -1;
      }
      if (a[field] > b[field]) {
        return 1;
      }
      return 0;
    },
    reverse: true,
  },
  az: {
    filter: artistNameFilter,
    reverse: false,
  },
  za: {
    filter: artistNameFilter,
    reverse: true,
  },
};

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
      },
      resolve: (_, args) => new Promise(resolve => (
        api.getNewReleases(args.limit)
          .then(({ results }) => {
            if (args.sort && filters[args.sort]) {
              const sorted = results.sort(filters[args.sort].filter);
              if (filters[args.sort].reverse) {
                sorted.reverse();
              }
              resolve(sorted);
              return sorted;
            }
            resolve(results);
            return results;
          })
      )),
    },
  },
});

export default CollectionType;
