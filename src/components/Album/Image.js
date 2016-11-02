import React, { Component } from 'react';
import L10NLink from '~/components/L10NLink';

class AlbumImage extends Component {
	render() {
		const album = this.props.album;

		return <L10NLink to={`/album/${album.id}`}>
			<img role="presentation" src={`/images/${album.image}`}/>
		</L10NLink>;
	}
}

export default AlbumImage;