import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {
  globalIdField,
  fromGlobalId,
  nodeDefinitions,
  connectionDefinitions,
} from 'graphql-relay';

import { TrackLoader } from '../../database';

const TrackType = new GraphQLObjectType({
  name: 'Track',
  fields: () => ({
    id: globalIdField('Track'),
    trackId: {
      type: GraphQLString,
      description: 'The id of the track.',
    },
    number: {
      type: GraphQLInt,
      description: 'The play index of the track.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the track.',
    },
    length: {
      type: GraphQLString,
      description: 'The formatted length of the track.',
    },
    src: {
      type: GraphQLString,
      description: 'The relative path to the source audio for the track.',
    },
  }),
  // eslint-disable-next-line
  interfaces: [nodeInterface],
});

const { nodeInterface } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'Track') {
      return TrackLoader.load(id);
    }
    return null;
  },

  (obj) => {
    if (obj instanceof TrackType) {
      return TrackType;
    }
    return null;
  }
);

const defs = connectionDefinitions({ nodeType: TrackType });

export const TrackEdge = defs.edgeType;
export const TrackConnection = defs.connectionType;

export default TrackType;
