import {
  GraphQLObjectType,
} from 'graphql';

import { globalIdField } from 'graphql-relay';
import { ArtistInterfaceType, ArtistFields } from './ArtistInterface';
import { AlbumArtist } from '../Root';

const AlbumArtistType = new GraphQLObjectType({
  name: 'AlbumArtist',
  description: 'An artist on the album.',
  interfaces: [ArtistInterfaceType],
  isTypeOf: value => value instanceof AlbumArtist,
  fields: () => ({
    id: globalIdField('AlbumArtist'),
    ...ArtistFields,
  }),
});

export default AlbumArtistType;
