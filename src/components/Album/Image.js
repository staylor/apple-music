import React, { Component } from 'react';
import Relay from 'react-relay';
import L10NLink from '~/components/L10NLink';

class AlbumImage extends Component {
	render() {
		const { id, image } = this.props.album;

		return <L10NLink to={`/album/${id}`}>
			<img role="presentation" src={`/images/${image}`}/>
		</L10NLink>;
	}
}

export default Relay.createContainer( AlbumImage, {
	fragments: {
		album: () => Relay.QL`
			fragment on Album {
				id,
				image,
			}
		`,
	}
} );