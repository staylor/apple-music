// @flow

import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const IDMapType = new GraphQLObjectType({
  name: 'IDMap',
  description: 'A  map of external IDs.',
  fields: () => ({
    upc: {
      type: GraphQLString,
      description: 'The UPC ID for the object.',
    },
  }),
});

export default IDMapType;
