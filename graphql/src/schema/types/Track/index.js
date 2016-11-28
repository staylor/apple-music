import {
  GraphQLObjectType,
} from 'graphql';

import { globalIdField } from 'graphql-relay';

import BrowseAlbumType from '../Album/Browse';
import { TrackInterfaceType, TrackFields } from './TrackInterface';

const TrackType = new GraphQLObjectType({
  name: 'Track',
  interfaces: [TrackInterfaceType],
  isTypeOf(value) {
    return 'album' in value;
  },
  fields: () => ({
    id: globalIdField('Track'),
    album: {
      type: BrowseAlbumType,
      description: 'The album related to the track.',
    },
    ...TrackFields,
  }),
});

export default TrackType;
