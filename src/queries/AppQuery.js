import Relay, { Route } from 'react-relay';
import cookie from 'react-cookie';

class AppQuery extends Route {
	static routeName = 'AppQuery';

	static queries = {
		currentAlbum: () => Relay.QL`query { album(id: $currentAlbumId) }`,
		currentTrack: () => Relay.QL`query { track(id: $currentTrackId) }`
	};

	static paramDefinitions = {
		currentAlbumId: { required: false },
		currentTrackId: { required: false }
	};

	static prepareParams = () => {
		return {
			currentTrackId: cookie.load( 'track' ),
			currentAlbumId: cookie.load( 'album' )
		};
	};
}

export default AppQuery;