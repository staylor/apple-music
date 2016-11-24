import Relay, { Route } from 'react-relay';

class CatalogQuery extends Route {
  static getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/Catalog').default);
    });
  }

  static queries() {
    return {
      newReleases: () => Relay.QL`query NewReleasesQuery { newReleases }`,
    };
  }
}

CatalogQuery.routeName = 'CatalogQuery';

export default CatalogQuery;
