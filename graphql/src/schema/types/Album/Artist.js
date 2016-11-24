import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import URLMapType from './URLMap';

const AlbumArtist = new GraphQLObjectType({
  name: 'AlbumArtist',
  description: 'An image.',
  fields: () => ({
    external_urls: {
      type: URLMapType,
      description: 'URLs for the artist.',
    },
    href: {
      type: GraphQLString,
      description: 'The Spotify web URL for the artist.',
    },
    id: {
      type: GraphQLString,
      description: 'The Spotify ID for the artist.',
    },
    artistId: {
      type: GraphQLString,
      description: 'The Spotify ID for the artist.',
      resolve: artist => artist.id,
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
  }),
});

export default AlbumArtist;
