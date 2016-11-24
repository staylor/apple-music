import {
  GraphQLObjectType,
} from 'graphql';

import BrowseAlbumType from '../Album/Browse';
import TrackFields from './TrackFields';

const TrackType = new GraphQLObjectType({
  name: 'Track',
  isTypeOf(value) {
    return 'album' in value;
  },
  fields: () => ({
    album: {
      type: BrowseAlbumType,
      description: 'The album related to the track.',
    },
    ...TrackFields,
  }),
});

export default TrackType;
