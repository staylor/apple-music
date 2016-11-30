// @flow

import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const ImageType = new GraphQLObjectType({
  name: 'Image',
  description: 'An image.',
  fields: () => ({
    height: {
      type: GraphQLInt,
      description: 'The height of the image.',
    },
    width: {
      type: GraphQLInt,
      description: 'The width of the image.',
    },
    url: {
      type: GraphQLString,
      description: 'The url of the image.',
    },
  }),
});

export default ImageType;
