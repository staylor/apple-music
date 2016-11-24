import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

const FollowersType = new GraphQLObjectType({
  name: 'Followers',
  description: 'Follower info for the object.',
  fields: () => ({
    href: {
      type: GraphQLString,
      description: 'The follower URL for the object.',
    },
    total: {
      type: GraphQLInt,
      description: 'The follower count for the object.',
    },
  }),
});

export default FollowersType;
