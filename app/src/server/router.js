import React from 'react';
import { renderToString } from 'react-dom/server';
import { RelayNetworkLayer, urlMiddleware, batchMiddleware } from 'react-relay-network-layer';
import IsomorphicRouter from 'isomorphic-relay-router';
import { match } from 'react-router';
import cookie from 'react-cookie';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import template from './template';
import routes from '../routes';
import appReducers from '../reducers';

const errorHandler = (error) => {
  // `fetchWithRetries` errors includes the response body
  // https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/fetch/fetchWithRetries.js#L93
  const isfetchWithRetriesError =
    !!error.response &&
    error.response.constructor.name === 'Body';

  // Include GQL's error response in addition
  // to the generic `fetchWithRetries` message
  if (isfetchWithRetriesError) {
    return error.response.text().then((payload) => {
      throw new Error(
        `${error.message} \n` +
        `Status Code: ${error.response.status} ${error.response.statusText} \n` +
        `Request URL: ${error.response.url} \n` +
        `Request Payload: \n` +
        `${payload} \n`
      );
    });
  }

  // Rethrow any errors that are not caused by `fetchWithRetries`
  throw error;
};

export default function router({
  gqlUrl,
  gqlBatchUrl,
  jsBundle,
  cssBundle,
}) {
  const networkLayer = new RelayNetworkLayer([
    batchMiddleware({
      batchUrl: () => gqlBatchUrl,
    }),
    urlMiddleware({
      url: () => gqlUrl,
    }),
  ]);

  return (req, res, next) =>
    match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
      if (err) {
        res.status(500).send(err.message);
      } else if (redirectLocation) {
        res.redirect(302, `${redirectLocation.pathname}${redirectLocation.search}`);
      } else if (!renderProps) {
        res.status(404).send('Not Found');
      }
      IsomorphicRouter
        .prepareData(renderProps, networkLayer)
        .then(({ data, props }) => {
          // these varibables might be reassigned by the callbacks in `<WithMetaContext>`
          const title = '';
          const description = '';
          const statusCode = 200;

          cookie.plugToRequest(req, res);
          const store = createStore(appReducers, {});
          const html = renderToString(
            <Provider store={store}>
              {IsomorphicRouter.render(props)}
            </Provider>
          );
          const preloadedState = store.getState();

          res.status(statusCode).send(template({
            title,
            description,
            html,
            jsBundle,
            cssBundle,
            preloadedState,
            data,
          }));
        })
        .catch(errorHandler)
        .catch(next);
    });
}
