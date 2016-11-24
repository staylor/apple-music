import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import ImageType from '../Image';
import ArtistFields from './ArtistFields';
import FollowersType from './Followers';

const ArtistType = new GraphQLObjectType({
  name: 'Artist',
  description: 'An artist in the catalog',
  fields: () => Object.assign({}, ArtistFields, {
    followers: {
      type: FollowersType,
      description: 'Follower info for the artist.',
    },
    genres: {
      type: new GraphQLList(GraphQLString),
      description: 'The genres for the artist.',
    },
    images: {
      type: new GraphQLList(ImageType),
      description: 'The genres for the artist.',
    },
    popularity: {
      type: GraphQLInt,
      description: 'The popularity ranking of the artist.',
    },
  }),
});

export default ArtistType;
