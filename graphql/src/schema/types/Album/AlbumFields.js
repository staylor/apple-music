import {
  GraphQLList,
  GraphQLString,
} from 'graphql';

import AlbumArtistType from './Artist';
import URLMapType from '../URLMap';
import ImageType from '../Image';

export default {
  id: {
    type: GraphQLString,
    description: 'The Spotify ID of the album.',
  },
  href: {
    type: GraphQLString,
    description: 'The Spotify web URL for the album.',
  },
  external_urls: {
    type: URLMapType,
    description: 'List of external URLs.',
  },
  name: {
    type: GraphQLString,
    description: 'The name of the album.',
  },
  uri: {
    type: GraphQLString,
    description: 'The Spotify URI for the album.',
  },
  type: {
    type: GraphQLString,
    description: 'Type of album.',
  },
  images: {
    type: new GraphQLList(ImageType),
    description: 'The genres for the artist.',
  },
  artists: {
    type: new GraphQLList(AlbumArtistType),
    description: 'The name of the artists who created the album.',
  },
  available_markets: {
    type: new GraphQLList(GraphQLString),
    description: 'List of 2-digit country codes where the album is available.',
  },
};
