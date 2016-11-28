import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} from 'graphql';

import api from '../../../database';
import TrackType from './index';

const TrackCollectionType = new GraphQLObjectType({
  name: 'TrackCollection',
  description: 'A list of results.',
  fields: {
    results: {
      type: new GraphQLList(TrackType),
      description: 'Currently, a list of tracks.',
      args: {
        trackType: { type: GraphQLString },
      },
      resolve: (_, args) => {
        if (args.trackType === 'topTracks') {
          return api.getArtistTracks(_.results);
        }
        return [];
      },
    },
  },
});

export default TrackCollectionType;
