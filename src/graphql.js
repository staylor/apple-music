import chalk from 'chalk';
import express from 'express';
import openBrowser from 'react-dev-utils/openBrowser';
import proxy from 'http-proxy-middleware';
import { schema } from '~/data/schema';
import router from '~/router';

export default ( protocol, host ) => {
	const app = express(),
		gqlPort = 4000,
		gqlHost = 'http://localhost:' + gqlPort,
		gqlPath = '/graphql';

	app.use( gqlPath, proxy({
		target: gqlHost,
		changeOrigin: true
	}) );

	app.get('*', router({ gqlUrl: gqlHost + gqlPath }));

	app.listen( 3000 );

	console.log( chalk.cyan( 'Starting the GraphQL server...' ) );
    console.log();
    openBrowser( protocol + '://' + host + ':3000/graphql' );
};