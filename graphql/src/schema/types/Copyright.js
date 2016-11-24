import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const CopyrightType = new GraphQLObjectType({
  name: 'Copyright',
  description: 'A list of copyrights.',
  fields: () => ({
    text: {
      type: GraphQLString,
      description: 'Copyright text.',
    },
    type: {
      type: GraphQLString,
      description: 'The type of copyright.',
    },
  }),
});

export default CopyrightType;
