import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { globalIdField } from 'graphql-relay';
import { AlbumFields, AlbumInterfaceType } from './AlbumInterface';
import { BrowseAlbum } from '../Root';
import { nodeInterface } from '../relayNode';

const BrowseAlbumType = new GraphQLObjectType({
  name: 'BrowseAlbum',
  interfaces: () => [AlbumInterfaceType, nodeInterface],
  description: 'An album in the catalog',
  isTypeOf(value) {
    return value instanceof BrowseAlbum;
  },
  fields: () => ({
    id: globalIdField('BrowseAlbum'),
    ...AlbumFields,
    album_type: {
      type: GraphQLString,
      description: 'The type of the album (usually: "album")',
    },
  }),
});

export default BrowseAlbumType;
