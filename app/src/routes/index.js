// @flow

import React from 'react';
import Relay from 'react-relay';
import { Route, IndexRoute } from 'react-router';

/* eslint-disable global-require */

const load = loader => (nextState, cb) => require.ensure([], () => cb(null, loader().default));

const manifest = {
  app: () => require('../containers/App'),
  catalog: () => require('../components/Catalog'),
  search: () => require('../components/Search'),
  album: () => require('../components/Album'),
  artist: () => require('../components/Artist'),
};

const catalogProps = {
  getComponent: load(manifest.catalog),
  getQueries: () => ({
    newReleases: () => Relay.QL`query NewReleasesQuery { newReleases }`,
  }),
};

const routes = (
  <Route
    path="/"
    getComponent={load(manifest.app)}
  >
    <IndexRoute {...catalogProps} />
    <Route
      path="(:locale/)search"
      getComponent={load(manifest.search)}
      getQueries={() => ({
        artistSearch: () => Relay.QL`query SearchArtistQuery { artistSearch }`,
        albumSearch: () => Relay.QL`query SearchAlbumQuery { albumSearch }`,
        trackSearch: () => Relay.QL`query SearchTrackQuery { trackSearch }`,
      })}
    />
    <Route path=":locale" {...catalogProps} />
    <Route
      path="(:locale/)album/:albumId"
      getComponent={load(manifest.album)}
      getQueries={() => ({
        album: () => Relay.QL`query AlbumQuery { album(id: $albumId) }`,
      })}
    />
    <Route
      path="(:locale/)artist/:artistId"
      getComponent={load(manifest.artist)}
      getQueries={() => ({
        artist: () => Relay.QL`query ArtistQuery { artist(id: $artistId) }`,
        artistAlbums: () => Relay.QL`query ArtistAlbumsQuery { artistAlbums(id: $artistId) }`,
        topTracks: () => Relay.QL`query TopTracksQuery { topTracks(id: $artistId) }`,
        relatedArtists: () => Relay.QL`query RelatedArtistQuery { relatedArtists(id: $artistId) }`,
      })}
    />
  </Route>
);

// Unfortunately, HMR breaks when we dynamically resolve
// routes so we need to require them here as a workaround.
// https://github.com/gaearon/react-hot-loader/issues/288
if (module.hot) {
  const walk = (data) => {
    Object.keys(data).forEach((key) => {
      if (typeof key === 'function') {
        manifest[key]();
      } else {
        walk(manifest[key]);
      }
    });
  };
  walk(manifest);
}

export default routes;
