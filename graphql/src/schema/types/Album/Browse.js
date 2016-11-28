import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { globalIdField } from 'graphql-relay';
import { AlbumFields, AlbumInterfaceType } from './AlbumInterface';

import { BrowseAlbum } from '../Root';

const BrowseAlbumType = new GraphQLObjectType({
  name: 'BrowseAlbum',
  interfaces: [AlbumInterfaceType],
  description: 'An album in the catalog',
  isTypeOf: value => value instanceof BrowseAlbum,
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
