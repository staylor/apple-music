
import React from 'react';
import ReactDOM from 'react-dom';
import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicRouter from 'isomorphic-relay-router';
import { browserHistory, match, Router } from 'react-router';
import Relay from 'react-relay';
import AppRoutes from '../routes';

// this is from the HTML document served by the server
const { data } = JSON.parse(document.getElementById('preloadedData').textContent);

const environment = new Relay.Environment();
const networkLayer = new Relay.DefaultNetworkLayer('/graphql');

environment.injectNetworkLayer(networkLayer);
IsomorphicRelay.injectPreparedData(environment, data);

const rootElement = document.getElementById('root');

const mount = (routes = AppRoutes) => {
  match({ routes, history: browserHistory }, (error, redirectLocation, renderProps) => {
    IsomorphicRouter.prepareInitialRender(environment, renderProps).then((props) => {
      ReactDOM.render(
        <Router {...props} onUpdate={() => window.scrollTo(0, 0)} />,
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
