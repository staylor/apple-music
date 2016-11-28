import {
  GraphQLObjectType,
} from 'graphql';

import { globalIdField } from 'graphql-relay';

import BrowseAlbumType from '../Album/Browse';
import { TrackInterfaceType, TrackFields } from './TrackInterface';

const TrackType = new GraphQLObjectType({
  name: 'Track',
  interfaces: [TrackInterfaceType],
  isTypeOf: value => 'album' in value,
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
