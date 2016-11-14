import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppQuery from '~/queries/AppQuery';
import CatalogQuery from '~/queries/CatalogQuery';
import AlbumQuery from '~/queries/AlbumQuery';
import ArtistQuery from '~/queries/ArtistQuery';

export default (
	<Route path="/"
		getComponent={AppQuery.getComponent}
		queries={AppQuery.queries}
		prepareParams={AppQuery.prepareParams}>
		<IndexRoute getComponent={CatalogQuery.getComponent}
			queries={CatalogQuery.queries} />
		<Route path=":locale"
			getComponent={CatalogQuery.getComponent}
			queries={CatalogQuery.queries} />
		<Route path="(:locale/)album/:albumId"
			getComponent={AlbumQuery.getComponent}
			queries={AlbumQuery.queries} />
		<Route path="(:locale/)artist/:artistId"
			getComponent={ArtistQuery.getComponent}
			queries={ArtistQuery.queries} />
	</Route>
);