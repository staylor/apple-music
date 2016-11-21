import Relay, { Route } from 'react-relay';

class AlbumQuery extends Route {
  static queries() {
    return {
      album: () => Relay.QL`query AlbumQuery { album(id: $albumId) }`,
    };
  }

  static getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/Album').default);
    });
  }
}

AlbumQuery.routeName = 'AlbumQuery';

export default AlbumQuery;
