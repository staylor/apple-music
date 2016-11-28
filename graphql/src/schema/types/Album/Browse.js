import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { globalIdField } from 'graphql-relay';

import { AlbumFields, AlbumInterfaceType } from './AlbumInterface';

const BrowseAlbumType = new GraphQLObjectType({
  name: 'BrowseAlbum',
  interfaces: [AlbumInterfaceType],
  description: 'An album in the catalog',
  isTypeOf: value => !('tracks' in value),
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
