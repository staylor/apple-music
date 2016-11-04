import React, { Component } from 'react';
import L10NLink from '~/components/L10NLink';

class SpotifyImage extends Component {
	render() {
		const { album_id, images } = this.props.album;
		let image;
		if ( images.length ) {
			image = images[0].url;
		}

		return <L10NLink to={`/album/${album_id}`}>
			<img role="presentation" src={image}/>
		</L10NLink>;
	}
}

export default SpotifyImage;