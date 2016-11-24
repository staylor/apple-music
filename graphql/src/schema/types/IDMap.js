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
      description: 'The UPC id fof the object.',
    },
  }),
});

export default IDMapType;
