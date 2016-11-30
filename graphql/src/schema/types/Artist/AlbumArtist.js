// @flow

import {
  GraphQLObjectType,
} from 'graphql';

import { globalIdField } from 'graphql-relay';

import { AlbumArtist } from '~/models';
import { ArtistInterfaceType, ArtistFields } from './ArtistInterface';
import { nodeInterface } from '../relayNode';

const AlbumArtistType = new GraphQLObjectType({
  name: 'AlbumArtist',
  description: 'An artist on the album.',
  interfaces: () => [ArtistInterfaceType, nodeInterface],
  isTypeOf(value) {
    return value instanceof AlbumArtist;
  },
  fields: () => ({
    id: globalIdField('AlbumArtist'),
    ...ArtistFields,
  }),
});

export default AlbumArtistType;
