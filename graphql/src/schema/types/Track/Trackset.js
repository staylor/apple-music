// @flow

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';

import AlbumTrackType from './AlbumTrack';

const TracksetType = new GraphQLObjectType({
  name: 'Trackset',
  description: 'A set of track data.',
  fields: () => ({
    href: {
      type: GraphQLString,
      description: 'URL for track info.',
    },
    items: {
      type: new GraphQLList(AlbumTrackType),
      description: 'A list of track objects.',
    },
    limit: {
      type: GraphQLInt,
      description: 'Maximum number of results per request.',
    },
    next: {
      type: GraphQLString,
      description: 'Optional: the next set of results.',
    },
    offset: {
      type: GraphQLInt,
      description: 'The offset of the results.',
    },
    previous: {
      type: GraphQLString,
      description: 'Optional: the previous set of results.',
    },
    total: {
      type: GraphQLInt,
      description: 'The total number of results.',
    },
  }),
});

export default TracksetType;
