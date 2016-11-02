import React, { Component } from 'react';
import Relay from 'react-relay';
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

export default Relay.createContainer( BrowseAlbum, {
	fragments: {
		album: () => Relay.QL`
			fragment on Album {
				id,
				name,
				image,
			}
		`,
	}
} );