import React from 'react';
import ReactDOM from 'react-dom';
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
import albums from '~/data/albums';

Store.init( {
	locale: 'en',
	song: null,
	album: null,
	currentTime: null,
	catalog: albums,
} );

ReactDOM.render(
	<Router history={browserHistory}
		render={applyRouterMiddleware(useRelay)}
		environment={Relay.Store}>
		<Route path="/" component={App}>
			<IndexRoute component={Catalog} queries={{
				catalog: () => Relay.QL`query { albums }`
			}} />
			<Route path="/album/:albumId" component={Album} queries={{
				album: () => Relay.QL`query { album(id: $albumId) }`
			}} />
			<Route path="/artist/:artistId" component={Artist} />
		</Route>
		<Route path="/:locale" component={App}>
			<IndexRoute component={Catalog} queries={{
				CatalogQuery: () => Relay.QL`query CatalogQuery { albums }`
			}} />
			<Route path="/:locale/album/:albumId" component={Album} queries={{
				album: () => Relay.QL`query { album(id: $albumId) }`
			}} />
			<Route path="/:locale/artist/:artistId" component={Artist} />
		</Route>
	</Router>,
	document.getElementById('root')
);
