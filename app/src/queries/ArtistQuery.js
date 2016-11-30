// @flow

import Relay, { Route } from 'react-relay';

class ArtistQuery extends Route {
  static queries() {
    return {
      artist: () => Relay.QL`query ArtistQuery { artist(id: $artistId) }`,
      artistAlbums: () => Relay.QL`query ArtistAlbumsQuery { artistAlbums(id: $artistId) }`,
      topTracks: () => Relay.QL`query TopTracksQuery { topTracks(id: $artistId) }`,
      relatedArtists: () => Relay.QL`query RelatedArtistQuery { relatedArtists(id: $artistId) }`,
    };
  }

  static getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/Artist').default);
    });
  }
}

ArtistQuery.routeName = 'ArtistQuery';

export default ArtistQuery;
