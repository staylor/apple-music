import React, { Component } from 'react';
import L10NLink from '~/components/L10NLink';

class ArtistLink extends Component {
	render() {
		const artist = this.props.artist;

		return <L10NLink to={`/artist/${artist.id}`}>{artist.name}</L10NLink>;
	}
}

export default ArtistLink;