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
import { globalIdField, nodeDefinitions, } from 'graphql-relay';
import Store from '~/flux/Store';
import albums from '~/data/albums';

Store.init( {
	locale: 'en',
	song: null,
	album: null,
	currentTime: null,
	catalog: albums,
} );
let store = Store.getData();

const TrackType = new GraphQLObjectType({
	name: 'Track',
	fields: {
		id: { type: GraphQLInt },
		number: { type: GraphQLInt },
		name: { type: GraphQLString },
		length: { type: GraphQLString },
		src: { type: GraphQLString }
	}
});

const DiscType = new GraphQLObjectType({
	name: 'Disc',
	fields: () => ( {
		number: { type: GraphQLInt },
		tracks: { type: new GraphQLList( TrackType ) }
	} )
});

const ArtistType = new GraphQLObjectType({
	name: 'Artist',
	fields: {
		id: { type: GraphQLString },
		name: { type: GraphQLString }
	}
});

const AlbumType = new GraphQLObjectType({
	name: 'Album',
	fields: () => ( {
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		artist: { type: ArtistType },
		genre: { type: GraphQLString },
		year: { type: GraphQLInt },
		length: { type: GraphQLString },
		image: { type: GraphQLString },
		discs: { type: new GraphQLList( DiscType ) }
	} )
});

const CollectionType = new GraphQLObjectType({
	name: 'Collection',
	fields: {
		results: { type: new GraphQLList( AlbumType ) }
	}
});

const Root = new GraphQLObjectType({
	name: 'Root',
	fields: () => ( {
		albums: {
			type: CollectionType,
			resolve: () => ({
				results: store.catalog
			})
		},
		album: {
			type: AlbumType,
			args: {
				id: { type: GraphQLString }
			},
			resolve: ( _, args ) => Store.albumById( args.id )
		}
	} )
});

export const schema = new GraphQLSchema({
	query: Root
} );