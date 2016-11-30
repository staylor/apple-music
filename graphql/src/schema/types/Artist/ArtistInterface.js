// @flow

import {
  GraphQLInterfaceType,
  GraphQLString,
} from 'graphql';

import { Artist } from '../Root';
import URLMapType from '../URLMap';

export const ArtistFields = {
  artist_id: {
    type: GraphQLString,
    description: 'The Spotify ID of the artist.',
    resolve: (artist: Artist) => artist.id,
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

export const ArtistInterfaceType = new GraphQLInterfaceType({
  name: 'ArtistInterface',
  fields: () => ({
    ...ArtistFields,
  }),
});
