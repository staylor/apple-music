import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RelayNetworkLayer, urlMiddleware } from 'react-relay-network-layer';
import IsomorphicRouter from 'isomorphic-relay-router';
import { match } from 'react-router';
import cookie from 'react-cookie';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import template from './template';
import routes from '../routes';
import appReducers from '../reducers';

const clientAssets = require(KYT.ASSETS_MANIFEST); // eslint-disable-line import/no-dynamic-require

// we get these from memory via webpack in DEV mode
let css = '';
let manifest = '';
if (process.env.NODE_ENV === 'production') {
  // Inline our CSS
  css = Object.keys(clientAssets)
        .filter(a => !!clientAssets[a].css)
        .map(a => fs.readFileSync(path.join(__dirname, '../public', clientAssets[a].css), 'utf8'))
        .join('\n');

  // Inline our manifest bundle mapping for performance reasons
  // (since it'll always be relatively small, better to save the rounddtrip)
  manifest = Object.keys(clientAssets)
        .filter(a => a === 'manifest')
        .map(a => fs.readFileSync(path.join(__dirname, '../public', clientAssets[a].js), 'utf8'))
        .reduce(a => a);
}

// Entry bundles (we only have 2: '0_vendor' and 'main')
const entries = Object.keys(clientAssets)
        .sort() // order matters, need "0_vendor" bundle to go first
        .filter(a => a === '0_vendor' || a === 'main')
        .map(a => clientAssets[a].js);

export default function router({ gqlUrl, gqlBatchUrl }) {
  // this configuration will be passed down to the client
  const clientConfig = {};
  const networkLayer = new RelayNetworkLayer([
    urlMiddleware({
      url: gqlUrl,
      batchUrl: gqlBatchUrl,
    }),
  ], { disableBatchQuery: false });

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
            css,
            entries,
            manifest,
            preloadedState,
            dehydratedData: {
              data,
              config: clientConfig,
            },
          }));
        })
        .catch((error) => {
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
        })
        .catch(next);
    });
}
