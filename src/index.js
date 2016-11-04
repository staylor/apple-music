import React from 'react';
import ReactDOM from 'react-dom';
import cookie from 'react-cookie';
import Relay from 'react-relay';
import {
	Router,
	Route,
	IndexRoute,
	browserHistory,
	applyRouterMiddleware
} from 'react-router';
import useRelay from 'react-router-relay';
import App from '~/components/App';
import Catalog from '~/components/Catalog';
import Album from '~/components/Album';
import Artist from '~/components/Artist';
import Store from '~/flux/Store';
import '~/scss/index.scss';
import catalog from '~/data/catalog';

Store.init( {
	locale: 'en',
	track: cookie.load( 'track' ),
	album: cookie.load( 'album' ),
	currentTime: null,
	catalog: catalog,
} );

const AppQueries = {
	currentAlbum: () => Relay.QL`query { currentAlbum }`,
	currentTrack: () => Relay.QL`query { currentTrack }`,
};

const CatalogQueries = {
	albums: () => Relay.QL`query { albums }`
};

const AlbumQueries = {
	album: () => Relay.QL`query { album(id: $albumId) }`
};

const ArtistQueries = {
	artist: () => Relay.QL`query { artist(id: $artistId) }`
};

ReactDOM.render(
	<Router history={browserHistory}
		render={applyRouterMiddleware(useRelay)}
		environment={Relay.Store}>
		<Route path="/" component={App} queries={AppQueries}>
			<IndexRoute component={Catalog} queries={CatalogQueries} />
			<Route path="/album/:albumId" component={Album} queries={AlbumQueries} />
			<Route path="/artist/:artistId" component={Artist} queries={ArtistQueries} />
		</Route>
		<Route path="/:locale" component={App} queries={AppQueries}>
			<IndexRoute component={Catalog} queries={CatalogQueries} />
			<Route path="/:locale/album/:albumId" component={Album} queries={AlbumQueries} />
			<Route path="/:locale/artist/:artistId" component={Artist} queries={ArtistQueries} />
		</Route>
	</Router>,
	document.getElementById('root')
);
