import Relay, { Route } from 'react-relay';

class AlbumQuery extends Route {
	static routeName = 'AlbumQuery';

	static queries = {
		album: () => Relay.QL`query AlbumQuery { album(id: $albumId) }`
	};
}

export default AlbumQuery;