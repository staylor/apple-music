import { Route } from 'react-relay';

class AppQuery extends Route {
  static getComponent(nextState, cb) {
    System.import('../components/App')
      .then(module => cb(null, module.default))
      .catch((error) => {
        console.error(error); // eslint-disable-line no-console
        cb(error, null);
      });
  }
}

AppQuery.routeName = 'AppQuery';

export default AppQuery;
