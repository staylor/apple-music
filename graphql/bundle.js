'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var express = _interopDefault(require('express'));
var graphQLHTTP = _interopDefault(require('express-graphql'));
var responseTime = _interopDefault(require('response-time'));
var bodyParser = _interopDefault(require('body-parser'));
var clc = _interopDefault(require('cli-color'));
var graphql = require('graphql');
var graphqlRelay = require('graphql-relay');
var cookie = _interopDefault(require('react-cookie'));
var fbemitter = require('fbemitter');

const jsonParser = bodyParser.json();

function queryLogger() {
  return [jsonParser, (req, res, next) => {
    const date = new Date();
    console.log('--- ' + clc.bold.green(`${ date.getHours() }:${ date.getMinutes() }:${ date.getSeconds() }`) + ' ---');
    console.log(clc.bold.blackBright('query:\n') + req.body.query);
    console.log(clc.bold.blackBright('variables:\n') + JSON.stringify(req.body.variables, null, 2));
    console.log('');
    Object.keys(req.headers).forEach(k => console.log(clc.bold.blackBright(`${ k }:`), req.headers[k]));
    next();
  }];
}

const artists = [{
  "name": "Bon Iver",
  "id": "273428126",
  "artistId": 273428126,
  "albums": [1141107722]
}, {
  "name": "Frank Ocean",
  "id": "442122051",
  "artistId": 442122051,
  "albums": [1146195596]
}, {
  "name": "Goodbye Picasso",
  "id": "12345678",
  "artistId": 12345678,
  "albums": [123456]
}];

const tracks = [{
  "number": 1,
  "id": "1141108073",
  "trackId": 1141108073,
  "name": "22 (OVER S∞∞N)",
  "length": "2:48",
  "src": "22-a-million/01.mp3"
}, {
  "number": 2,
  "id": "1141108076",
  "trackId": 1141108076,
  "name": "10 d E A T h b R E a s T ⚄ ⚄",
  "length": "2:24",
  "src": "22-a-million/02.mp3"
}, {
  "number": 3,
  "id": "1141108077",
  "trackId": 1141108077,
  "name": "715 - CRΣΣKS",
  "length": "2:12",
  "src": "22-a-million/03.mp3"
}, {
  "number": 4,
  "id": "1141108078",
  "trackId": 1141108078,
  "name": "33 “GOD”",
  "length": "3:33",
  "src": "22-a-million/04.m4a"
}, {
  "number": 5,
  "id": "1141108079",
  "trackId": 1141108079,
  "name": "29 #Strafford APTS",
  "length": "4:05",
  "src": "22-a-million/05.mp3"
}, {
  "number": 6,
  "id": "1141108080",
  "trackId": 1141108080,
  "name": "666 ʇ",
  "length": "4:12",
  "src": "22-a-million/06.mp3"
}, {
  "number": 7,
  "id": "1141108081",
  "trackId": 1141108081,
  "name": "21 M♢♢N WATER",
  "length": "3:08",
  "src": "22-a-million/07.mp3"
}, {
  "number": 8,
  "id": "1141108082",
  "trackId": 1141108082,
  "name": "8 (circle)",
  "length": "5:09",
  "src": "22-a-million/08.mp3"
}, {
  "number": 9,
  "id": "1141108083",
  "trackId": 1141108083,
  "name": "____45_____",
  "length": "2:46",
  "src": "22-a-million/09.mp3"
}, {
  "number": 10,
  "id": "1141108088",
  "trackId": 1141108088,
  "name": "00000 Million",
  "length": "3:53",
  "src": "22-a-million/10.mp3"
}, {
  "number": 1,
  "id": "11",
  "trackId": 11,
  "name": "City Blues",
  "length": "3:09",
  "src": "mixes/1.mp3"
}, {
  "number": 2,
  "id": "12",
  "trackId": 12,
  "name": "Old Ohio",
  "length": "3:52",
  "src": "mixes/2.mp3"
}, {
  "number": 3,
  "id": "13",
  "trackId": 13,
  "name": "A Drunkard's Testimonial",
  "length": "3:43",
  "src": "mixes/3.mp3"
}, {
  "number": 4,
  "id": "14",
  "trackId": 14,
  "name": "Flesh and Bone",
  "length": "4:43",
  "src": "mixes/4.mp3"
}, {
  "number": 5,
  "id": "15",
  "trackId": 15,
  "name": "Wasted Love",
  "length": "5:27",
  "src": "mixes/5.mp3"
}, {
  "number": 6,
  "id": "16",
  "trackId": 16,
  "name": "Winter Blues",
  "length": "7:12",
  "src": "mixes/6.mp3"
}, {
  "number": 7,
  "id": "17",
  "trackId": 17,
  "name": "Georgia",
  "length": "5:16",
  "src": "mixes/7.mp3"
}, {
  "number": 1,
  "id": "1146195712",
  "trackId": 1146195712,
  "name": "Nikes",
  "length": "5:14",
  "src": ""
}, {
  "number": 2,
  "id": "1146195713",
  "trackId": 1146195713,
  "name": "Ivy",
  "length": "4:09",
  "src": ""
}, {
  "number": 3,
  "id": "1146195714",
  "trackId": 1146195714,
  "name": "Pink + White",
  "length": "3:04",
  "src": ""
}, {
  "number": 4,
  "id": "1146195715",
  "trackId": 1146195715,
  "name": "Be Yourself",
  "length": "1:26",
  "src": ""
}, {
  "number": 5,
  "id": "1146195716",
  "trackId": 1146195716,
  "name": "Solo",
  "length": "4:17",
  "src": ""
}, {
  "number": 6,
  "id": "1146195717",
  "trackId": 1146195717,
  "name": "Skyline To",
  "length": "3:04",
  "src": ""
}, {
  "number": 7,
  "id": "1146195718",
  "trackId": 1146195718,
  "name": "Self Control",
  "length": "4:09",
  "src": ""
}, {
  "number": 8,
  "id": "1146195719",
  "trackId": 1146195719,
  "name": "Good Guy",
  "length": "1:06",
  "src": ""
}, {
  "number": 9,
  "id": "1146195720",
  "trackId": 1146195720,
  "name": "Nights",
  "length": "5:07",
  "src": ""
}, {
  "number": 10,
  "id": "1146195721",
  "trackId": 1146195721,
  "name": "Solo (Reprise)",
  "length": "1:18",
  "src": ""
}, {
  "number": 11,
  "id": "1146195722",
  "trackId": 1146195722,
  "name": "Pretty Sweet",
  "length": "2:37",
  "src": ""
}, {
  "number": 12,
  "id": "1146195723",
  "trackId": 1146195723,
  "name": "Facebook Story",
  "length": "1:08",
  "src": ""
}, {
  "number": 13,
  "id": "1146195724",
  "trackId": 1146195724,
  "name": "Close to You",
  "length": "1:25",
  "src": ""
}, {
  "number": 14,
  "id": "1146195725",
  "trackId": 1146195725,
  "name": "White Ferrari",
  "length": "4:08",
  "src": ""
}, {
  "number": 15,
  "id": "1146195726",
  "trackId": 1146195726,
  "name": "Seigfried",
  "length": "5:34",
  "src": ""
}, {
  "number": 16,
  "id": "1146195727",
  "trackId": 1146195727,
  "name": "Godspeed",
  "length": "2:57",
  "src": ""
}, {
  "number": 17,
  "id": "1146195728",
  "trackId": 1146195728,
  "name": "Futura Free",
  "length": "9:24",
  "src": ""
}];

const albums = [{
  "id": "1141107722",
  "albumId": 1141107722,
  "name": "22, A Million",
  "artist": "273428126",
  "genre": "Alternative",
  "year": 2016,
  "length": "35 minutes",
  "image": "22-a-million.jpg",
  "discs": [{
    "tracks": [1141108073, 1141108076, 1141108077, 1141108078, 1141108079, 1141108080, 1141108081, 1141108082, 1141108083, 1141108088]
  }]
}, {
  "id": "123456",
  "albumId": 123456,
  "name": "Mixes",
  "artist": "12345678",
  "genre": "Pop",
  "year": 2016,
  "length": "34 minutes",
  "image": "default.png",
  "discs": [{
    "tracks": [11, 12, 13, 14, 15, 16, 17]
  }]
}, {
  "id": "1146195596",
  "albumId": 1146195596,
  "name": "Blonde",
  "artist": "442122051",
  "genre": "Pop",
  "year": 2016,
  "length": "1 hour, 1 minute",
  "image": "blonde.jpg",
  "discs": [{
    "tracks": [1146195712, 1146195713, 1146195714, 1146195715, 1146195716, 1146195717, 1146195718, 1146195719, 1146195720, 1146195721, 1146195722, 1146195723, 1146195724, 1146195725, 1146195726, 1146195727, 1146195728]
  }]
}];

var catalog = { albums, artists, tracks };

const langs = {};
let data = {
  locale: 'en',
  track: cookie.load('track'),
  album: cookie.load('album'),
  currentTime: null,
  catalog
};
let audio;
const albumsById = {};
const artistsById = {};
const tracksById = {};

const emitter = new fbemitter.EventEmitter();

const Store = {
  AUDIO_PATH: '/audio/',

  setAudio() {
    if (typeof window === 'undefined') {
      return;
    }

    audio = document.createElement('audio');
    if (data.track) {
      const track = this.trackById(data.track);
      audio.src = `${ this.AUDIO_PATH }${ track.src }`;
    }

    audio.ontimeupdate = event => {
      Store.set('currentTime', event.timeStamp);
    };
  },

  getAudio() {
    if (audio) {
      return audio;
    }

    this.setAudio();

    return audio;
  },

  getData() {
    return data;
  },

  set(key, value) {
    data[key] = value;
    emitter.emit(`change:${ key }`);
    emitter.emit('change');
  },

  setData(newData) {
    data = newData;
    emitter.emit('change');
  },

  addListener(eventType, fn) {
    return emitter.addListener(eventType, fn);
  },

  change() {
    emitter.emit('change');
  },

  getLocale() {
    return data.locale;
  },

  getMessages() {
    const locale = this.getLocale();

    if (langs[locale]) {
      return langs[locale];
    }

    langs[locale] = require(`../langs/${ locale }.js`).default;

    return langs[locale];
  },

  albumById(albumId) {
    albumId = parseInt(albumId, 10);
    if (albumsById[albumId]) {
      return albumsById[albumId];
    }

    if (!data.catalog) {
      return null;
    }

    const album = data.catalog.albums.find(currentAlbum => currentAlbum.albumId === albumId);
    albumsById[albumId] = album;
    return album;
  },

  artistById(artistId) {
    artistId = parseInt(artistId, 10);
    if (artistsById[artistId]) {
      return artistsById[artistId];
    }

    if (!data.catalog) {
      return null;
    }

    const artist = data.catalog.artists.find(currentArtist => currentArtist.artistId === artistId);
    artistsById[artistId] = artist;
    return artist;
  },

  trackById(trackId) {
    trackId = parseInt(trackId, 10);
    if (tracksById[trackId]) {
      return tracksById[trackId];
    }

    if (!data.catalog) {
      return null;
    }

    const artist = data.catalog.tracks.find(track => track.trackId === trackId);
    tracksById[trackId] = artist;
    return artist;
  },

  getCurrentAlbum() {
    const albumId = cookie.load('album');
    if (albumId) {
      return this.albumById(albumId);
    }
    return null;
  },

  getCurrentTrack() {
    const trackId = cookie.load('track');
    if (trackId) {
      return this.trackById(trackId);
    }
    return null;
  },

  getAlbums() {
    return data.catalog.albums;
  },

  getArtists() {
    return data.catalog.artists;
  },

  getTracks() {
    return data.catalog.tracks;
  }
};

const store = Store.getData();

const { nodeInterface, nodeField } = graphqlRelay.nodeDefinitions(globalId => {
  const { type, id } = graphqlRelay.fromGlobalId(globalId);
  if (type === 'Album') {
    return Store.albumById(id);
  } else if (type === 'Artist') {
    return Store.artistById(id);
  } else if (type === 'Track') {
    return Store.trackById(id);
  }
  return null;
}, obj => {
  if (obj instanceof AlbumType) {
    return AlbumType;
  } else if (obj instanceof ArtistType) {
    return ArtistType;
  } else if (obj instanceof TrackType) {
    return TrackType;
  }
  return null;
});

const TrackType = new graphql.GraphQLObjectType({
  name: 'Track',
  fields: () => ({
    id: graphqlRelay.globalIdField('Track'),
    trackId: {
      type: graphql.GraphQLInt,
      description: 'The id of the track.'
    },
    number: {
      type: graphql.GraphQLInt,
      description: 'The play index of the track.'
    },
    name: {
      type: graphql.GraphQLString,
      description: 'The name of the track.'
    },
    length: {
      type: graphql.GraphQLString,
      description: 'The formatted length of the track.'
    },
    src: {
      type: graphql.GraphQLString,
      description: 'The relative path to the source audio for the track.'
    }
  }),
  interfaces: [nodeInterface]
});

const DiscType = new graphql.GraphQLObjectType({
  name: 'Disc',
  fields: () => ({
    number: { type: graphql.GraphQLInt },
    tracks: {
      type: TrackConnection,
      description: 'A list of tracks.',
      args: graphqlRelay.connectionArgs,
      resolve: (disc, args) => graphqlRelay.connectionFromArray(disc.tracks.map(id => Store.trackById(id)), args)
    }
  })
});

const ArtistType = new graphql.GraphQLObjectType({
  name: 'Artist',
  description: 'An artist in the catalog',
  fields: () => ({
    id: graphqlRelay.globalIdField('Artist'),
    artistId: {
      type: graphql.GraphQLInt,
      description: 'The id of the artist.'
    },
    name: {
      type: graphql.GraphQLString,
      description: 'The name of the artist.'
    },
    albums: {
      type: AlbumConnection,
      description: 'Albums by the artist.',
      args: graphqlRelay.connectionArgs,
      resolve: (artist, args) => graphqlRelay.connectionFromArray(artist.albums.map(id => Store.albumById(id)), args)
    }
  }),
  interfaces: [nodeInterface]
});

const AlbumType = new graphql.GraphQLObjectType({
  name: 'Album',
  description: 'An album in the catalog',
  fields: () => ({
    id: graphqlRelay.globalIdField('Album'),
    albumId: {
      type: graphql.GraphQLInt,
      description: 'The id of the album.'
    },
    name: {
      type: graphql.GraphQLString,
      description: 'The name of the album.'
    },
    artist: {
      type: ArtistConnection,
      description: 'The name of the artist who created the album.',
      args: graphqlRelay.connectionArgs,
      resolve: (album, args) => graphqlRelay.connectionFromArray([Store.artistById(album.artist)], args)
    },
    genre: {
      type: graphql.GraphQLString,
      description: 'The genre of the album.'
    },
    year: {
      type: graphql.GraphQLInt,
      description: 'The year the album was released.'
    },
    length: {
      type: graphql.GraphQLString,
      description: 'The formatted length of the album.'
    },
    image: {
      type: graphql.GraphQLString,
      description: 'The relative path of the cover image source.'
    },
    discs: {
      type: new graphql.GraphQLList(DiscType),
      description: 'Discs containing tracks. Most albums contain only one disc.'
    }
  }),
  interfaces: [nodeInterface]
});

const {
  // eslint-disable-next-line no-unused-vars
  edgeType: ArtistEdge,
  connectionType: ArtistConnection
} = graphqlRelay.connectionDefinitions({ nodeType: ArtistType });

const {
  // eslint-disable-next-line no-unused-vars
  edgeType: AlbumEdge,
  connectionType: AlbumConnection
} = graphqlRelay.connectionDefinitions({ nodeType: AlbumType });

const {
  // eslint-disable-next-line no-unused-vars
  edgeType: TrackEdge,
  connectionType: TrackConnection
} = graphqlRelay.connectionDefinitions({ nodeType: TrackType });

const CollectionType = new graphql.GraphQLObjectType({
  name: 'Collection',
  description: 'A list of results.',
  fields: {
    results: {
      type: new graphql.GraphQLList(AlbumType),
      description: 'Currently, a list of albums.'
    }
  }
});

const Root = new graphql.GraphQLObjectType({
  name: 'Root',
  fields: () => ({
    albums: {
      type: CollectionType,
      resolve: () => ({
        results: store.catalog.albums
      })
    },
    album: {
      type: AlbumType,
      args: {
        id: { type: graphql.GraphQLInt }
      },
      resolve: (_, args) => Store.albumById(args.id)
    },
    artist: {
      type: ArtistType,
      args: {
        id: { type: graphql.GraphQLInt }
      },
      resolve: (_, args) => Store.artistById(args.id)
    },
    track: {
      type: TrackType,
      args: {
        id: { type: graphql.GraphQLInt }
      },
      resolve: (_, args) => Store.trackById(args.id)
    },
    currentAlbum: {
      type: AlbumType,
      resolve: () => Store.getCurrentAlbum()
    },
    currentTrack: {
      type: TrackType,
      resolve: () => Store.getCurrentTrack()
    },
    node: nodeField
  })
});

const Schema = new graphql.GraphQLSchema({
  query: Root
});

/* eslint-disable no-console */

const GRAPHQL_PORT = 8080;
const app = express();

// uncomment this to output incoming query and request headers
app.use(queryLogger());

app.use(responseTime((req, res, time) => {
  console.log(`Response time: ${ Math.floor(time) }ms`);
}));

app.use(express.static('public'));

// Expose a GraphQL endpoint using the GQL middleware
app.use('/', graphQLHTTP(req => ({
  graphiql: true,
  schema: Schema,
  rootValue: {
    cookies: req.cookies
  }
})));

const server = app.listen(process.env.PORT || GRAPHQL_PORT, () => {
  const { address, port } = server.address();
  console.log(`GraphQL Server is now running on http://${ address }:${ port }`);
});
//# sourceMappingURL=bundle.js.map
