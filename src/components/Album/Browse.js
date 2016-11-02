import React, { Component } from 'react';
import AlbumLink from '~/components/Album/Link';
import AlbumImage from '~/components/Album/Image';

class BrowseAlbum extends Component {
	render() {
		const album = this.props.album;

		return (
			<li>
				<AlbumImage album={album} />
				<AlbumLink album={album} />
			</li>
		);
	}
}

export default BrowseAlbum;