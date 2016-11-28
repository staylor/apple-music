import {
  GraphQLObjectType,
} from 'graphql';

import { globalIdField } from 'graphql-relay';

import { ArtistInterfaceType, ArtistFields } from './ArtistInterface';

const AlbumArtistType = new GraphQLObjectType({
  name: 'AlbumArtist',
  description: 'An artist on the album.',
  interfaces: [ArtistInterfaceType],
  isTypeOf: value => !('followers' in value),
  fields: () => ({
    id: globalIdField('AlbumArtist'),
    ...ArtistFields,
  }),
});

export default AlbumArtistType;
