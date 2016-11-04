import Relay, { Route } from 'react-relay';

class ArtistQuery extends Route {
	static routeName = 'ArtistQuery';

	static queries = {
		artist: () => Relay.QL`query { artist(id: $artistId) }`
	};
}

export default ArtistQuery;