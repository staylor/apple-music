import Relay, { Route } from 'react-relay';

class CatalogQuery extends Route {
  static getComponent(nextState, cb) {
    System.import('../components/Catalog')
      .then(module => cb(null, module.default))
      .catch((error) => {
        console.error(error); // eslint-disable-line no-console
        cb(error, null);
      });
  }

  static queries() {
    return {
      albums: () => Relay.QL`query CatalogQuery { albums }`,
    };
  }
}

CatalogQuery.routeName = 'CatalogQuery';

export default CatalogQuery;
