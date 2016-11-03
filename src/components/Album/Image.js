import React, { Component } from 'react';
import L10NLink from '~/components/L10NLink';

class AlbumImage extends Component {
	render() {
		const { albumId, image } = this.props.album;

		return <L10NLink to={`/album/${albumId}`}>
			<img role="presentation" src={`/images/${image}`}/>
		</L10NLink>;
	}
}

export default AlbumImage;