import {
  GraphQLInt,
  GraphQLObjectType,
} from 'graphql';

import {
  connectionArgs,
  connectionFromArray,
} from 'graphql-relay';

import { TrackConnection } from './Track';
import { TrackLoader } from '../../database';

const DiscType = new GraphQLObjectType({
  name: 'Disc',
  fields: () => ({
    number: { type: GraphQLInt },
    tracks: {
      type: TrackConnection,
      description: 'A list of tracks.',
      args: connectionArgs,
      resolve: (disc, args) => connectionFromArray(
        disc.tracks.map(id => TrackLoader.load(id)),
        args
      ),
    },
  }),
});

export default DiscType;
