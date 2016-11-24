import {
  GraphQLString,
} from 'graphql';

import URLMapType from '../URLMap';

export default {
  id: {
    type: GraphQLString,
    description: 'The Spotify ID for the artist.',
  },
  external_urls: {
    type: URLMapType,
    description: 'URLs for the artist.',
  },
  href: {
    type: GraphQLString,
    description: 'The Spotify web URL for the artist.',
  },
  name: {
    type: GraphQLString,
    description: 'The name of the artist.',
  },
  type: {
    type: GraphQLString,
    description: 'The type of object (usually: "artist").',
  },
  uri: {
    type: GraphQLString,
    description: 'The Spotify URI for the artist.',
  },
};
