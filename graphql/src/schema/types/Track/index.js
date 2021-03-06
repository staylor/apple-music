// @flow

import {
  GraphQLObjectType,
} from 'graphql';

import { globalIdField } from 'graphql-relay';

import BrowseAlbumType from '../Album/Browse';
import { TrackInterfaceType, TrackFields } from './TrackInterface';
import { Track } from '~/models';
import { nodeInterface } from '../relayNode';

const TrackType = new GraphQLObjectType({
  name: 'Track',
  interfaces: () => [TrackInterfaceType, nodeInterface],
  isTypeOf(value) {
    return value instanceof Track;
  },
  fields: () => ({
    id: globalIdField('Track'),
    ...TrackFields,
    album: {
      type: BrowseAlbumType,
      description: 'The album related to the track.',
    },
  }),
});

export default TrackType;
