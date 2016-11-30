import express from 'express';
import graphQLHTTP from 'express-graphql';
import responseTime from 'response-time';
import queryLogger from './middleware/queryLogger';
import Schema from './schema/schema';

/* eslint-disable no-console */

const GRAPHQL_PORT = 8080;
const app = express();

// uncomment this to output incoming query and request headers
// app.use(queryLogger());

app.use(responseTime((req, res, time) => {
  console.log(`Response time: ${Math.floor(time)}ms`);
}));

app.use(express.static('public'));

// Expose a GraphQL endpoint using the GQL middleware
app.use('/', graphQLHTTP(req => ({
  graphiql: true,
  schema: Schema,
  rootValue: {
    cookies: req.cookies,
  },
})));

const server = app.listen(process.env.PORT || GRAPHQL_PORT, () => {
  const { address, port } = server.address();
  console.log(`GraphQL Server is now running on http://${address}:${port}`);
});
