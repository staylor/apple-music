import React, { Component } from 'react';
import L10NLink from '~/components/L10NLink';

class AlbumLink extends Component {
	render() {
		const { albumId, name } = this.props.album;

		return <L10NLink to={`/album/${albumId}`}>{name}</L10NLink>;
	}
}

export default AlbumLink;