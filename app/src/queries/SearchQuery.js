// @flow

import Relay, { Route } from 'react-relay';

class SearchQuery extends Route {
  static queries() {
    return {
      artistSearch: () => Relay.QL`query SearchArtistQuery { artistSearch }`,
      albumSearch: () => Relay.QL`query SearchAlbumQuery { albumSearch }`,
      trackSearch: () => Relay.QL`query SearchTrackQuery { trackSearch }`,
    };
  }

  static getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/Search').default);
    });
  }
}

SearchQuery.routeName = 'SearchQuery';

export default SearchQuery;
