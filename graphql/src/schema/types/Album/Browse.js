import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import AlbumFields from './AlbumFields';
import AlbumInterfaceType from './AlbumInterface';

const BrowseAlbumType = new GraphQLObjectType({
  name: 'BrowseAlbum',
  interfaces: [AlbumInterfaceType],
  description: 'An album in the catalog',
  isTypeOf(value) {
    return !('tracks' in value);
  },
  fields: () => ({
    ...AlbumFields,
    album_type: {
      type: GraphQLString,
      description: 'The type of the album (usually: "album")',
    },
  }),
});

export default BrowseAlbumType;
