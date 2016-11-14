import Relay, { Route } from 'react-relay';

class ArtistQuery extends Route {
	static routeName = 'ArtistQuery';

	static queries = {
		artist: () => Relay.QL`query ArtistQuery { artist(id: $artistId) }`
	};

	static getComponent = ( nextState, cb ) => {
		System.import( '../components/Artist' )
			.then( module => cb( null, module.default ) )
			.catch( error => {
				console.error( error ); // eslint-disable-line no-console
				cb( error, null );
			} );
	};
}

export default ArtistQuery;