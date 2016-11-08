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
		} else if ( type === 'Album' ) {
			return api.getAlbum( id );
		}
		return null;
	},

	obj => {
		if ( obj instanceof Artist ) {
			return ArtistType;
		} else if ( obj instanceof Track ) {
			return TrackType;
		} else if ( obj instanceof Album ) {
			return AlbumType;
		}
		return null;
	}
);

const TrackType = new GraphQLObjectType({
	name: 'Track',
	fields: () => ( {
		id: globalIdField( 'Track' ),
		artists: {
			type: new GraphQLList( ArtistType ),
			description: 'Artists featured on the track.'
		},
		available_markets: {
			type: new GraphQLList( GraphQLString ),
			description: 'Available markets.'
		},
		disc_number: {
			type: GraphQLInt,
			description: 'Disc number.'
		},
		duration_ms: {
			type: GraphQLInt,
			description: 'Duration in milliseconds.'
		},
		explicit: {
			type: GraphQLBoolean,
			description: 'Explicit flag.'
		},
		external_urls: {
			type: URLMapType,
			description: 'URLs for the track.'
		},
		href: {
			type: GraphQLString,
			description: 'The Spotify web URL for the track.'
		},
		name: {
			type: GraphQLString,
			description: 'The name of the track.'
		},
		preview_url: {
			type: GraphQLString,
			description: 'The Spotify web URL for the track.'
		},
		track_number: {
			type: GraphQLInt,
			description: 'The Spotify web URL for the track.'
		},
		type: {
			type: GraphQLString,
			description: 'The type of object.'
		},
		uri: {
			type: GraphQLString,
			description: 'The Spotiy URI for the track.'
		},
		track_id: {
			type: GraphQLString,
			description: 'The id of the track.'
		}
	} ),
	interfaces: [ nodeInterface ]
});

const TrackCollectionType = new GraphQLObjectType({
	name: 'TrackCollection',
	fields: () => ( {
		items: {
			type: new GraphQLList( TrackType ),
			description: 'List of tracks.'
		},
	} )
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
			type: URLMapType,
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

const IDMapType = new GraphQLObjectType({
	name: 'IDMap',
	description: 'A  map of external IDs.',
	fields: () => ( {
		upc: {
			type: GraphQLString,
			description: 'The UPC ID for the object.'
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

const CopyrightType = new GraphQLObjectType({
	name: 'Copyright',
	description: 'A  list of copyrights.',
	fields: () => ( {
		text: {
			type: GraphQLString,
			description: 'The text for the copyright.'
		},
		type: {
			type: GraphQLString,
			description: 'The type of copyright.'
		},
	} )
});

const AlbumType = new GraphQLObjectType({
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
		copyrights: {
			type: new GraphQLList( CopyrightType ),
			description: 'A list of copyrights.'
		},
		external_ids: {
			type: IDMapType,
			description: 'URLs for the album.'
		},
		external_urls: {
			type: URLMapType,
			description: 'URLs for the album.'
		},
		genres: {
			type: new GraphQLList( GraphQLString ),
			description: 'Genres for the album.'
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
		label: {
			type: GraphQLString,
			description: 'The label of the album.'
		},
		popularity: {
			type: GraphQLInt,
			description: 'The popularity of the album.'
		},
		release_date: {
			type: GraphQLString,
			description: 'The release date for the album.'
		},
		release_date_precision: {
			type: GraphQLString,
			description: 'The release date for the album.'
		},
		tracks: {
			type: TrackCollectionType,
			description: 'Album tracks.'
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


const BrowseAlbumType = new GraphQLObjectType({
	name: 'BrowseAlbum',
	description: 'An album in the catalog',
	fields: () => ( {
		id: {
			type: GraphQLString,
			description: 'The id of the album.'
		},
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
	} )
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
		album: {
			type: AlbumType,
			args: {
				id: { type: GraphQLString }
			},
			resolve: ( _, args ) => api.getAlbum( args.id )
		},
		artist: {
			type: ArtistType,
			args: {
				id: { type: GraphQLString }
			},
			resolve: ( _, args ) => api.getArtist( args.id )
		},
		track: {
			type: TrackType,
			args: {
				id: { type: GraphQLString }
			},
			resolve: ( _, args ) => api.getTrack( args.id )
		},
		node: nodeField
	} )
});

export const schema = new GraphQLSchema({
	query: Root
} );