// @flow

import {
  GraphQLInterfaceType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';

import { Track } from '~/models';
import URLMapType from '../URLMap';
import AlbumArtistType from '../Artist/AlbumArtist';

export const TrackFields = {
  track_id: {
    type: GraphQLString,
    description: 'The Spotify ID of the track.',
    resolve: (track: Track): string => track.id,
  },
  artists: {
    type: new GraphQLList(AlbumArtistType),
    description: 'The artists on the track.',
  },
  available_markets: {
    type: new GraphQLList(GraphQLString),
    description: 'Available markets.',
  },
  disc_number: {
    type: GraphQLInt,
    description: 'The disc index of the track.',
  },
  duration_ms: {
    type: GraphQLInt,
    description: 'The track length is milliseconds.',
  },
  explicit: {
    type: GraphQLBoolean,
    description: 'Whether the track has explicit lyrics.',
  },
  external_urls: {
    type: URLMapType,
    description: 'A list of URLs for the track.',
  },
  href: {
    type: GraphQLString,
    description: 'The Spotify URL of the track.',
  },
  name: {
    type: GraphQLString,
    description: 'The name of the track.',
  },
  preview_url: {
    type: GraphQLString,
    description: 'The formatted length of the track.',
  },
  track_number: {
    type: GraphQLInt,
    description: 'The index of the track.',
  },
  type: {
    type: GraphQLString,
    description: 'The type of track (usually: "track").',
  },
  uri: {
    type: GraphQLString,
    description: 'The Spotify URI of the track.',
  },
};

export const TrackInterfaceType = new GraphQLInterfaceType({
  name: 'TrackInterface',
  fields: () => ({
    ...TrackFields,
  }),
});
