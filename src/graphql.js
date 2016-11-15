import chalk from 'chalk';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import openBrowser from 'react-dev-utils/openBrowser';
import { schema } from '~/data/schema';

export default ( protocol, host ) => {
	const app = express();
	app.use('/graphql', graphqlHTTP({
		schema: schema,
		graphiql: true
	}));
	app.listen( 4000 );

	console.log( chalk.cyan( 'Starting the GraphQL server...' ) );
	console.log();
	openBrowser( protocol + '://' + host + ':4000/graphql' );
};