import React, { Component } from 'react';
import L10NLink from '~/components/L10NLink';

class ArtistLink extends Component {
	render() {
		const { artistId, name } = this.props.artist;

		return <L10NLink to={`/artist/${artistId}`}>{name}</L10NLink>;
	}
}

export default ArtistLink;