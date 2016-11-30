// @flow

import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import { globalIdField } from 'graphql-relay';

import { Album } from '~/models';
import { AlbumFields, AlbumInterfaceType } from './AlbumInterface';
import TracksetType from '../Track/Trackset';
import CopyrightType from '../Copyright';
import IDMapType from '../IDMap';
import { nodeInterface } from '../relayNode';

const AlbumType = new GraphQLObjectType({
  name: 'Album',
  description: 'An album in the catalog',
  interfaces: () => [AlbumInterfaceType, nodeInterface],
  isTypeOf(value) {
    return value instanceof Album;
  },
  fields: () => ({
    id: globalIdField('Album'),
    ...AlbumFields,
    copyrights: {
      type: new GraphQLList(CopyrightType),
      description: 'List of copyrights.',
    },
    external_ids: {
      type: IDMapType,
      description: 'List of external IDs.',
    },
    genres: {
      type: new GraphQLList(GraphQLString),
      description: 'The genres for the album.',
    },
    popularity: {
      type: GraphQLInt,
      description: 'The popularity ranking of the album.',
    },
    release_date: {
      type: GraphQLString,
      description: 'The date the album was released.',
    },
    release_date_precision: {
      type: GraphQLString,
      description: 'The precision of the release date.',
    },
    tracks: {
      type: TracksetType,
      description: 'The album track info.',
    },
  }),
});

export default AlbumType;
