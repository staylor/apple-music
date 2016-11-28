import {
  GraphQLObjectType,
} from 'graphql';

import { globalIdField } from 'graphql-relay';
import { TrackInterfaceType, TrackFields } from './TrackInterface';
import { AlbumTrack } from '../Root';

const AlbumTrackType = new GraphQLObjectType({
  name: 'AlbumTrack',
  interfaces: [TrackInterfaceType],
  isTypeOf: value => value instanceof AlbumTrack,
  fields: () => ({
    id: globalIdField('AlbumTrack'),
    ...TrackFields,
  }),
});

export default AlbumTrackType;
