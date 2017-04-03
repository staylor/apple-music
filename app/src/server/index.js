import 'isomorphic-fetch';
import path from 'path';
import 'source-map-support/register';
import express from 'express';
import proxy from 'http-proxy-middleware';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import querystring from 'querystring';
import NodeCache from 'node-cache';
import router from './router';
import { clientId, clientSecret } from '../../../graphql/src/providers/Spotify';

const port = Number.parseInt(KYT.SERVER_PORT, 10);
const clientAssets = require(KYT.ASSETS_MANIFEST); // eslint-disable-line import/no-dynamic-require
const app = express();
const cache = new NodeCache();

app.use(cookieParser());

// Standard Apache combined log output.
// https://github.com/expressjs/morgan#combined
app.use(morgan('combined'));

// use a local GQL server by default
const gqlHost =
  process.env.GQL_HOST ||
  'http://localhost:8080';

const gqlPath = '/graphql';
const gqlBatchPath = '/graphql/batch';

const staticPath = process.env.NODE_ENV === 'production' ?
  path.join(__dirname, '../public') :
  path.join(process.cwd(), '/src/public');

// serve static assets
app.use(express.static(staticPath));

app.use(gqlPath, proxy({
  target: gqlHost,
  changeOrigin: true,
}));

app.get('/spotify-callback', (req, res) => {
  const tokenKey = 'spotify:token';
  const auth = new Buffer(`${clientId}:${clientSecret}`).toString('base64');
  const data = querystring.stringify({
    grant_type: 'authorization_code',
    code: req.query.code,
    redirect_uri: 'http://localhost:3000/spotify-callback',
  });

  fetch('https://accounts.spotify.com/api/token', {
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    body: data,
  }).then(response => response.json()).then((json) => {
    cache.set(
      tokenKey,
      json.access_token,
      json.expires_in
    );
    res.redirect('/');
  });
});

// react-router is handling all the routing
app.get('*', router({
  gqlUrl: gqlHost + gqlPath,
  gqlBatchUrl: gqlHost + gqlBatchPath,
  jsBundle: clientAssets.main.js,
  cssBundle: clientAssets.main.css,
}));

// Error handling
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const statusCode = err.status || 500;
  res.status(statusCode);
  res.send(`
    <html>
      <body>
        <h1>${err.name}</h1>
        <pre>${err.stack}</pre>
      </body>
    </html>
  `);
});

app.listen(port);
