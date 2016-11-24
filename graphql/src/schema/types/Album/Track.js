import {
  GraphQLObjectType,
} from 'graphql';

import TrackFields from '../Track/TrackFields';

const AlbumTrackType = new GraphQLObjectType({
  name: 'AlbumTrack',
  isTypeOf(value) {
    return !('album' in value);
  },
  fields: () => ({
    ...TrackFields,
  }),
});

export default AlbumTrackType;
