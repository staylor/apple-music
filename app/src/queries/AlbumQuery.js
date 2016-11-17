import Relay, { Route } from 'react-relay';

class AlbumQuery extends Route {
  static queries() {
    return {
      album: () => Relay.QL`query AlbumQuery { album(id: $albumId) }`,
    };
  }

  static getComponent(nextState, cb) {
    System.import('../components/Album')
      .then(module => cb(null, module.default))
      .catch((error) => {
        console.error(error); // eslint-disable-line no-console
        cb(error, null);
      });
  }
}

AlbumQuery.routeName = 'AlbumQuery';

export default AlbumQuery;
