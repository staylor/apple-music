
import React from 'react';
import ReactDOM from 'react-dom';
import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicRouter from 'isomorphic-relay-router';
import { browserHistory, match, Router } from 'react-router';
import Relay from 'react-relay';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppRoutes from '../routes';
import appReducers from '../reducers';

// eslint-disable-next-line no-underscore-dangle
const preloadedState = JSON.parse(document.getElementById('preloadedState').textContent);

const store = createStore(
  appReducers,
  preloadedState,
  // eslint-disable-next-line
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// this is from the HTML document served by the server
const { data } = JSON.parse(document.getElementById('preloadedData').textContent);

const environment = new Relay.Environment();
const networkLayer = new Relay.DefaultNetworkLayer('/graphql', {
  credentials: 'same-origin',
});

environment.injectNetworkLayer(networkLayer);
IsomorphicRelay.injectPreparedData(environment, data);

const rootElement = document.getElementById('root');

const mount = (routes = AppRoutes) => {
  match({ routes, history: browserHistory }, (error, redirectLocation, renderProps) => {
    IsomorphicRouter.prepareInitialRender(environment, renderProps).then((props) => {
      ReactDOM.render(
        <Provider store={store}>
          <Router {...props} onUpdate={() => window.scrollTo(0, 0)} />
        </Provider>,
        rootElement
      );
    });
  });
};

mount();

if (module.hot) {
  // Rerender after any changes to the following.
  module.hot.accept('../routes', () => {
    const newRoutes = require('../routes').default; // eslint-disable-line global-require

    mount(newRoutes);
  });
}
