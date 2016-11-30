// @flow

import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {
  globalIdField,
  connectionDefinitions,
  connectionArgs,
} from 'graphql-relay';

import api from '../../database';
import BrowseAlbumType from './Album/Browse';

const idxPrefix = 'idx---';
const toBase64 = (str: string): string => new Buffer(str).toString('base64');
const fromBase64 = (encoded: string): string => Buffer.from(encoded, 'base64').toString('utf8');
const indexToCursor = idx => toBase64(`${idxPrefix}${idx}`);
const indexFromCursor = cursor => fromBase64(cursor).replace(idxPrefix, '');
const toEdges = data => data.map((item, index) => ({
  node: item,
  cursor: indexToCursor(index),
}));

const { connectionType: BrowseAlbumConnection } =
  connectionDefinitions({ nodeType: BrowseAlbumType });

const CollectionType = new GraphQLObjectType({
  name: 'Collection',
  description: 'A list of results.',
  fields: {
    id: globalIdField('Collection'),
    results: {
      type: BrowseAlbumConnection,
      description: 'Currently, a list of albums.',
      args: {
        type: { type: GraphQLString },
        ...connectionArgs,
      },
      resolve: (_, args) => {
        if (args.type === 'newReleases') {
          return new Promise(resolve => (
            api.getNewReleases({
              limit: args.first || 50,
              offset: args.after ? (indexFromCursor(args.after) + 1) : 0,
            }).then((data) => {
              const connection = {
                edges: toEdges(data.items),
                pageInfo: {
                  hasNextPage: Boolean(data.next && data.next.length),
                  hasPreviousPage: Boolean(data.previous && data.previous.length),
                  startCursor: data.total > 0 ? indexToCursor(0) : null,
                  endCursor: data.total > 0 ? indexToCursor(data.total) : null,
                },
              };
              resolve(connection);
            })
          ));
        } else if (args.type === 'artistAlbums') {
          return api.getArtistAlbums(_.results);
        }

        return [];
      },
    },
  },
});

export default CollectionType;
