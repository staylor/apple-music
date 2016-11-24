import {
  GraphQLObjectType,
} from 'graphql';

import ArtistFields from '../Artist/ArtistFields';

const AlbumArtist = new GraphQLObjectType({
  name: 'AlbumArtist',
  description: 'An image.',
  fields: () => Object.assign({}, ArtistFields),
});

export default AlbumArtist;
