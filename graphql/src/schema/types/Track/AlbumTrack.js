import {
  GraphQLObjectType,
} from 'graphql';

import { globalIdField } from 'graphql-relay';

import { TrackInterfaceType, TrackFields } from './TrackInterface';

const AlbumTrackType = new GraphQLObjectType({
  name: 'AlbumTrack',
  interfaces: [TrackInterfaceType],
  isTypeOf: value => !('album' in value),
  fields: () => ({
    id: globalIdField('AlbumTrack'),
    ...TrackFields,
  }),
});

export default AlbumTrackType;
