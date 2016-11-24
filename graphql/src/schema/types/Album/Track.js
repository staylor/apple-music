import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

import URLMapType from '../URLMap';
import AlbumArtistType from './Artist';

const AlbumTrackType = new GraphQLObjectType({
  name: 'AlbumTrack',
  fields: () => ({
    artists: new GraphQLList(AlbumArtistType),
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
    id: {
      type: GraphQLString,
      description: 'The id of the track.',
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
  }),
});

export default AlbumTrackType;
