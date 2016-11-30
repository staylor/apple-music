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

import { nodeInterface } from './relayNode';
import api from '../../database';
import BrowseAlbumType from './Album/Browse';

const idxPrefix = 'idx---';
const toBase64 = (str: string): string => new Buffer(str).toString('base64');
const fromBase64 = (encoded: string): string => Buffer.from(encoded, 'base64').toString('utf8');
const indexToCursor = (idx: number): string => toBase64(`${idxPrefix}${idx}`);
const indexFromCursor = (cursor: string): number => parseInt(fromBase64(cursor).replace(idxPrefix, ''), 10);
const toEdges = (data: Object[], offset: number): Object[] => {
  let i = offset;
  return data.map(item => ({
    node: item,
    cursor: indexToCursor(i++),
  }));
};

const { connectionType: BrowseAlbumConnection } =
  connectionDefinitions({ nodeType: BrowseAlbumType });

const CollectionType = new GraphQLObjectType({
  name: 'Collection',
  description: 'A list of results.',
  interfaces: () => [nodeInterface],
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
        switch (args.type) {
          case 'newReleases':
            const limit: number = args.first || args.last || 50;

            let offset = 0;
            if (args.after) {
              offset = indexFromCursor(args.after) + 1;
            } else if (args.before) {
              offset = indexFromCursor(args.before) - limit;
            }

            return new Promise(resolve => {
              api.getNewReleases({ limit, offset }).then((data) => {
                const startIndex = offset;
                const endIndex = startIndex + (limit - 1);
                const hasNextPage = (null !== data.next);
                const hasPreviousPage = (null !== data.previous);

                resolve({
                  edges: toEdges(data.items, offset),
                  pageInfo: {
                    hasNextPage,
                    hasPreviousPage,
                    startCursor: data.total > 0 ? indexToCursor(startIndex) : null,
                    endCursor: data.total > 0 ? indexToCursor(endIndex) : null,
                  },
                });
              });
            });

          case 'artistAlbums':
            return api.getArtistAlbums(_.results);
          default:
            return [];
        }
      },
    },
  },
});

export default CollectionType;
