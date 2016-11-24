import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const URLMapType = new GraphQLObjectType({
  name: 'URLMap',
  description: 'A  map of external URL.',
  fields: () => ({
    spotify: {
      type: GraphQLString,
      description: 'The spotify URL for the object.',
    },
  }),
});

export default URLMapType;
