import {
  GraphQLObjectType,
} from 'graphql';

import ArtistFields from '../Artist/ArtistFields';
import ArtistInterfaceType from '../Artist/ArtistInterface';

const AlbumArtistType = new GraphQLObjectType({
  name: 'AlbumArtist',
  description: 'An artist on the album.',
  interfaces: [ArtistInterfaceType],
  isTypeOf: value => !('followers' in value),
  fields: () => ({
    ...ArtistFields,
  }),
});

export default AlbumArtistType;
