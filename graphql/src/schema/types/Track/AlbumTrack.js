// @flow

import {
  GraphQLObjectType,
} from 'graphql';

import { globalIdField } from 'graphql-relay';
import { TrackInterfaceType, TrackFields } from './TrackInterface';
import { AlbumTrack } from '../Root';
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
