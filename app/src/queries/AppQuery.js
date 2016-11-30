// @flow

import { Route } from 'react-relay';

class AppQuery extends Route {
  static getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/App').default);
    });
  }
}

AppQuery.routeName = 'AppQuery';

export default AppQuery;
