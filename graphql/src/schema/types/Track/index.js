import {
  GraphQLObjectType,
} from 'graphql';

import BrowseAlbumType from '../Album/Browse';
import TrackFields from './TrackFields';

const TrackType = new GraphQLObjectType({
  name: 'Track',
  fields: () => Object.assign({}, TrackFields, {
    album: {
      type: BrowseAlbumType,
      description: 'The album related to the track.',
    },
  }),
});

export default TrackType;
