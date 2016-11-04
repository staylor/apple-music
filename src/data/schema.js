import Spotify from '~/providers/Spotify';
import {
	GraphQLBoolean,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
} from 'graphql';
import {
	globalIdField,
	fromGlobalId,
	nodeDefinitions,
	connectionDefinitions,
	connectionArgs,
	connectionFromArray,
} from 'graphql-relay';

const api = new Spotify();

const { nodeInterface, nodeField } = nodeDefinitions(
	globalId => {
		const { type, id } = fromGlobalId( globalId );
		if ( type === 'Artist' ) {
			return api.getArtist( id );
		} else if ( type === 'Track' ) {
			return api.getTrack( id );
		}
		return null;
	},

	obj => {
		if ( obj instanceof Artist ) {
			return ArtistType;
		} else if ( obj instanceof Track ) {
			return TrackType;
		}
		return null;
	}
);

const TrackType = new GraphQLObjectType({
	name: 'Track',
	fields: () => ( {
		id: globalIdField( 'Track' ),
		trackId: {
			type: GraphQLInt,
			description: 'The id of the track.'
		},
		number: {
			type: GraphQLInt,
			description: 'The play index of the track.'
		},
		name: {
			type: GraphQLString,
			description: 'The name of the track.'
		},
		length: {
			type: GraphQLString,
			description: 'The formatted length of the track.'
		},
		src: {
			type: GraphQLString,
			description: 'The relative path to the source audio for the track.'
		}
	} ),
	interfaces: [ nodeInterface ]
});

const ArtistType = new GraphQLObjectType({
	name: 'Artist',
	description: 'An artist in the catalog',
	fields: () => ( {
		id: globalIdField( 'Artist' ),
		artist_id: {
			type: GraphQLInt,
			description: 'The id of the artist.'
		},
		href: {
			type: GraphQLString,
			description: 'The Spotify web URL for the artist.'
		},
		name: {
			type: GraphQLString,
			description: 'The name of the artist.'
		},
		type: {
			type: GraphQLString,
			description: 'The type of object.'
		},
		uri: {
			type: GraphQLString,
			description: 'The Spotiy URI for the artist.'
		},
		external_urls: {
			type: new GraphQLList( URLMapType ),
			description: 'External URLs for the artist.'
		}
	} ),
	interfaces: [ nodeInterface ]
});

const ImageType = new GraphQLObjectType({
	name: 'Image',
	description: 'An image.',
	fields: () => ( {
		height: {
			type: GraphQLInt,
			description: 'The height of the image.'
		},
		width: {
			type: GraphQLInt,
			description: 'The width of the image.'
		},
		url: {
			type: GraphQLString,
			description: 'The url of the image.'
		},
	} )
});

const URLMapType = new GraphQLObjectType({
	name: 'URLMap',
	description: 'A  map of external URL.',
	fields: () => ( {
		spotify: {
			type: GraphQLString,
			description: 'The spotify URL for the object.'
		},
	} )
});

const BrowseAlbumType = new GraphQLObjectType({
	name: 'Album',
	description: 'An album in the catalog',
	fields: () => ( {
		id: globalIdField( 'Album' ),
		album_id: {
			type: GraphQLString,
			description: 'The id of the album.'
		},
		album_type: {
			type: GraphQLString,
			description: 'Type of album.'
		},
		artists: {
			type: new GraphQLList( ArtistType ),
			description: 'Artists featured on the album.'
		},
		available_markets: {
			type: new GraphQLList( GraphQLString ),
			description: 'Available markets.'
		},
		external_urls: {
			type: URLMapType,
			description: 'URLs for the album.'
		},
		href: {
			type: GraphQLString,
			description: 'The Spotify web URL for the album.'
		},
		images: {
			type: new GraphQLList( ImageType ),
			description: 'Artists featured on the album.'
		},
		name: {
			type: GraphQLString,
			description: 'The name of the album.'
		},
		type: {
			type: GraphQLString,
			description: 'Type of album.'
		},
		uri: {
			type: GraphQLString,
			description: 'The Spotify URI for the album.'
		},
	} ),
	interfaces: [ nodeInterface ]
});

const CollectionType = new GraphQLObjectType({
	name: 'Collection',
	description: 'A list of results.',
	fields: {
		results: {
			type: new GraphQLList( BrowseAlbumType ),
			description: 'Currently, a list of albums.'
		}
	}
});

const Root = new GraphQLObjectType({
	name: 'Root',
	fields: () => ( {
		albums: {
			type: CollectionType,
			resolve: () => api.getAlbums()
		},
		artist: {
			type: ArtistType,
			args: {
				id: { type: GraphQLInt }
			},
			resolve: ( _, args ) => api.getArtist( args.id )
		},
		track: {
			type: TrackType,
			args: {
				id: { type: GraphQLInt }
			},
			resolve: ( _, args ) => api.getTrack( args.id )
		},
		node: nodeField
	} )
});

export const schema = new GraphQLSchema({
	query: Root
} );