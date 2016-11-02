import React, { Component } from 'react';
import L10NLink from '~/components/L10NLink';

class AlbumLink extends Component {
	render() {
		const album = this.props.album;

		return <L10NLink to={`/album/${album.id}`}>{album.name}</L10NLink>;
	}
}

export default AlbumLink;