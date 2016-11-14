import Relay, { Route } from 'react-relay';

class CatalogQuery extends Route {
	static routeName = 'CatalogQuery';

	static getComponent = ( nextState, cb ) => {
		System.import( '../components/Catalog' )
			.then( module => cb( null, module.default ) )
			.catch( error => {
				console.error( error ); // eslint-disable-line no-console
				cb( error, null );
			} );
	};

	static queries = {
		albums: () => Relay.QL`query CatalogQuery { albums }`
	};
}

export default CatalogQuery;