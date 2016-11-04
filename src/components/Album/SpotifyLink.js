import React, { Component } from 'react';
import L10NLink from '~/components/L10NLink';

class SpotifyLink extends Component {
	render() {
		const { album_id, name } = this.props.album;

		return <L10NLink to={`/album/${album_id}`}>{name}</L10NLink>;
	}
}

export default SpotifyLink;