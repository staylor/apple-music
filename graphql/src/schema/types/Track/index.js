import {
  GraphQLObjectType,
} from 'graphql';

import { globalIdField } from 'graphql-relay';
import BrowseAlbumType from '../Album/Browse';
import { TrackInterfaceType, TrackFields } from './TrackInterface';
import { Track } from '../Root';

const TrackType = new GraphQLObjectType({
  name: 'Track',
  interfaces: [TrackInterfaceType],
  isTypeOf: value => value instanceof Track,
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
