import React from 'react';
import ReactDOM from 'react-dom';
import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicRouter from 'isomorphic-relay-router';
import { Environment, DefaultNetworkLayer } from 'react-relay';
import { match, Router, browserHistory } from 'react-router';
import AppRoutes from '~/routes';
import '~/scss/index.scss';

const environment = new Environment();
const networkLayer = new DefaultNetworkLayer( 'http://localhost:4000/graphql' );

environment.injectNetworkLayer( networkLayer );

IsomorphicRelay.injectPreparedData( environment, [] );

const mount = (routes = AppRoutes) => {
	match({ routes, history: browserHistory }, (error, redirectLocation, renderProps) => {
		IsomorphicRouter.prepareInitialRender(environment, renderProps).then((props) => {
			console.log( props );
			ReactDOM.render(
				<Router {...props} onUpdate={() => window.scrollTo(0, 0)} />,
				document.getElementById('root')
			);
		});
	});
};

mount();
