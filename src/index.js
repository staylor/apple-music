import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from '~/components/App';
import Catalog from '~/components/Catalog';
import Album from '~/components/Album';
import Artist from '~/components/Artist';
import Store from '~/flux/Store';
import '~/scss/index.scss';
import albums from '~/data/albums';

Store.init( {
	song: null,
	album: null,
	currentTime: null,
	catalog: albums,
} );

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Catalog} />
			<Route path="/album/:albumId" component={Album} />
			<Route path="/artist/:artistId" component={Artist} />
		</Route>
	</Router>,
	document.getElementById('root')
);
