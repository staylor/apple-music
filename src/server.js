import path from 'path';
import chokidar from 'chokidar';
import nodemon from 'nodemon';
import chalk from 'chalk';
import { once } from 'ramda';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import openBrowser from 'react-dev-utils/openBrowser';
import proxy from 'http-proxy-middleware';
import detect from 'detect-port';
import router from '~/router';
import logger from '~/logger';

import clientConfig from '../config/webpack.config.dev.js';
import serverConfig from '../config/webpack.server.dev.js';


// Determines whethere the given port is in use
const ifPortIsFreeDo = (port, callback) => {
	detect(port, (error, unusedPort) => {
		if (error) {
			logger.error('error attempting to detect port', error);
			process.exit();
		}

		if (port === unusedPort) {
			callback();
		} else {
			logger.error(`port: ${port} is in use.`);
			logger.info('Ports can be configured in kyt.config.js');
			process.exit();
		}
	});
};

const serverCompiler = webpack(serverConfig, stats => {
	if ( stats.hasErrors() ) {
		return;
	}
	startServerOnce();
});

const startServer = () => {
    const serverPaths = Object
      .keys(serverCompiler.options.entry)
      .map(entry => path.join(serverCompiler.options.output.path, `${entry}.js`));
    const mainPath = path.join(serverCompiler.options.output.path, 'main.js');

    nodemon({ script: mainPath, watch: serverPaths, nodeArgs: flags })
      .once('start', () => {
        logger.task(`Server running at: http://localhost:3000`);
        logger.end('Development started');
      })
      .on('restart', () => logger.end('Development server restarted'))
      .on('quit', process.exit);
};

const startServerOnce = once( () => ifPortIsFreeDo( 3000, startServer ) );

const compileServer = () => {
	serverCompiler.run(() => undefined);
};

// Watch the server files and recompile and restart on changes.
const watcher = chokidar.watch([ __dirname + '/src' ]);
watcher.on('ready', () => {
  watcher
	.on('add', compileServer)
	.on('addDir', compileServer)
	.on('change', compileServer)
	.on('unlink', compileServer)
	.on('unlinkDir', compileServer);
});

let ran = false;
const clientCompiler = webpack(clientConfig, stats => {
	if ( stats.hasErrors() ) {
		return;
	}
	if ( ! ran ) {
		ran = true;
		compileServer();
	}
});

const startClient = () => {
	const app = express(),
		gqlPort = 4000,
		gqlHost = 'http://localhost:' + gqlPort,
		gqlPath = '/graphql';

	app.use( webpackDevMiddleware( clientCompiler, {
		publicPath: '/',
		headers: { 'Access-Control-Allow-Origin': '*' },
		noInfo: true,
		quiet: true
	} ) );
	app.use( hotMiddleware( clientCompiler ) );

	app.use( gqlPath, proxy({
		target: gqlHost,
		changeOrigin: true
	}) );

	app.get('*', router({ gqlUrl: gqlHost + gqlPath }));

	app.listen( 3001 );

	console.log( chalk.cyan( 'Starting the web server...' ) );
	console.log();
	//openBrowser( 'http://localhost:3000' );
};

ifPortIsFreeDo( 3001, startClient );