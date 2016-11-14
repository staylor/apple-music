import Relay, { Route } from 'react-relay';
import cookie from 'react-cookie';

class AppQuery extends Route {
	static routeName = 'AppQuery';

	static queries = {
		currentAlbum: () => Relay.QL`query CurrentAlbumQuery { album(id: $currentAlbumId) }`,
		currentTrack: () => Relay.QL`query CurrentTrackQuery { track(id: $currentTrackId) }`
	};

	static getComponent = ( nextState, cb ) => {
		System.import( '../components/App' )
			.then( module => cb( null, module.default ) )
			.catch( error => {
				console.error( error ); // eslint-disable-line no-console
				cb( error, null );
			} );
	};

	static paramDefinitions = {
		currentAlbumId: { required: false },
		currentTrackId: { required: false }
	};

	static prepareParams = () => {
		return {
			currentTrackId: cookie.load( 'track' ) || 0,
			currentAlbumId: cookie.load( 'album' ) || 0
		};
	};
}

export default AppQuery;