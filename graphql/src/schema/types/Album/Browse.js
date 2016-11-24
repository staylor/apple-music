import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import AlbumFields from './AlbumFields';

const BrowseAlbumType = new GraphQLObjectType({
  name: 'BrowseAlbum',
  description: 'An album in the catalog',
  fields: () => Object.assign({}, AlbumFields, {
    id: {
      type: GraphQLString,
      description: 'The Spotify ID of the album.',
    },
    album_type: {
      type: GraphQLString,
      description: 'The type of the album (usually: "album")',
    },
  }),
});

export default BrowseAlbumType;
