// @flow

import {
  GraphQLObjectType,
} from 'graphql';

import { globalIdField } from 'graphql-relay';

import { AlbumTrack } from '~/models';
import { TrackInterfaceType, TrackFields } from './TrackInterface';
import { nodeInterface } from '../relayNode';

const AlbumTrackType = new GraphQLObjectType({
  name: 'AlbumTrack',
  interfaces: () => [TrackInterfaceType, nodeInterface],
  isTypeOf(value) {
    return value instanceof AlbumTrack;
  },
  fields: () => ({
    id: globalIdField('AlbumTrack'),
    ...TrackFields,
  }),
});

export default AlbumTrackType;
