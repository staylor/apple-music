import Relay, { Route } from 'react-relay';

class CatalogQuery extends Route {
	static routeName = 'CatalogQuery';

	static queries = {
		albums: () => Relay.QL`query CatalogQuery { albums }`
	};
}

export default CatalogQuery;