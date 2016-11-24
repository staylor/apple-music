import {
  GraphQLObjectType,
} from 'graphql';

import TrackFields from '../Track/TrackFields';

const AlbumTrackType = new GraphQLObjectType({
  name: 'AlbumTrack',
  fields: () => Object.assign({}, TrackFields),
});

export default AlbumTrackType;
