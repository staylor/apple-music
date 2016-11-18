import path from 'path';
import 'source-map-support/register';
import express from 'express';
import proxy from 'http-proxy-middleware';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import router from './router';

const port = Number.parseInt(KYT.SERVER_PORT, 10);
const app = express();

app.use(cookieParser());

// Standard Apache combined log output.
// https://github.com/expressjs/morgan#combined
app.use(morgan('combined'));

// use a local GQL server by default
const gqlHost =
  process.env.GQL_HOST ||
  'http://localhost:8080';

// the pathname is dervied from samizdat
const gqlPath = '/graphql';

const staticPath = process.env.NODE_ENV === 'production' ?
  path.join(__dirname, '../public') :
  path.join(process.cwd(), '/src/public');

// serve static assets
app.use(express.static(staticPath));

// proxy to the graphql server
app.use(gqlPath, proxy({
  target: gqlHost,
  changeOrigin: true,
}));

// health check for kubernetes
app.get('/.healthcheck', (req, res) => {
  res.sendStatus(200);
});

// react-router is handling all the routing
app.get('*', router({ gqlUrl: gqlHost + gqlPath }));

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
