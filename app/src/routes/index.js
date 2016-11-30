// @flow

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppQuery from '~/queries/AppQuery';
import CatalogQuery from '~/queries/CatalogQuery';
import AlbumQuery from '~/queries/AlbumQuery';
import ArtistQuery from '~/queries/ArtistQuery';

const routes = (
  <Route
    path="/"
    getComponent={AppQuery.getComponent}
  >
    <IndexRoute
      getComponent={CatalogQuery.getComponent}
      getQueries={CatalogQuery.queries}
    />
    <Route
      path=":locale"
      getComponent={CatalogQuery.getComponent}
      getQueries={CatalogQuery.queries}
    />
    <Route
      path="(:locale/)album/:albumId"
      getComponent={AlbumQuery.getComponent}
      getQueries={AlbumQuery.queries}
    />
    <Route
      path="(:locale/)artist/:artistId"
      getComponent={ArtistQuery.getComponent}
      getQueries={ArtistQuery.queries}
    />
  </Route>
);


// Unfortunately, HMR breaks when we dynamically resolve
// routes so we need to require them here as a workaround.
// https://github.com/gaearon/react-hot-loader/issues/288
if (module.hot) {
  require('../components/App');    // eslint-disable-line global-require
  require('../components/Album');   // eslint-disable-line global-require
  require('../components/Artist');   // eslint-disable-line global-require
  require('../components/Catalog');   // eslint-disable-line global-require
}

export default routes;
