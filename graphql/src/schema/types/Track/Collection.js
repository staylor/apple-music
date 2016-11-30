// @flow

import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} from 'graphql';

import api from '~/database';
import TrackType from './index';

const TrackCollectionType = new GraphQLObjectType({
  name: 'TrackCollection',
  description: 'A list of results.',
  fields: {
    results: {
      type: new GraphQLList(TrackType),
      description: 'Currently, a list of tracks.',
      args: {
        type: { type: GraphQLString },
        q: { type: GraphQLString },
      },
      resolve: (_, args) => {
        if (args.type === 'trackSearch') {
          if (args.q) {
            return api.getTrackSearch(args.q).then(tracks => tracks.items);
          }
          return [];
        }
        return api.getArtistTracks(_.results);
      },
    },
  },
});

export default TrackCollectionType;
