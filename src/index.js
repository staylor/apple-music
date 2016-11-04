import React from 'react';
import ReactDOM from 'react-dom';
import { Store } from 'react-relay';
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
import AppQuery from '~/queries/AppQuery';
import CatalogQuery from '~/queries/CatalogQuery';
import AlbumQuery from '~/queries/AlbumQuery';
import ArtistQuery from '~/queries/ArtistQuery';
import '~/scss/index.scss';

ReactDOM.render(
	<Router history={browserHistory}
		render={applyRouterMiddleware(useRelay)}
		environment={Store}>
		<Route path="/" component={App} queries={AppQuery.queries} prepareParams={AppQuery.prepareParams}>
			<IndexRoute component={Catalog} queries={CatalogQuery.queries} />
			<Route path=":locale" component={Catalog} queries={CatalogQuery.queries} />
			<Route path="(:locale/)album/:albumId" component={Album} queries={AlbumQuery.queries} />
			<Route path="(:locale/)artist/:artistId" component={Artist} queries={ArtistQuery.queries} />
		</Route>
	</Router>,
	document.getElementById('root')
);
