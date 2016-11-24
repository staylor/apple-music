import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const URLMapType = new GraphQLObjectType({
  name: 'URLMap',
  description: 'A  map of external URLs.',
  fields: () => ({
    spotify: {
      type: GraphQLString,
      description: 'The Spotify URL for the object.',
    },
  }),
});

export default URLMapType;
