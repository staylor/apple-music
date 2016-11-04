import React, { Component } from 'react';
import Relay from 'react-relay';
import SpotifyLink from '~/components/Album/SpotifyLink';
import SpotifyImage from '~/components/Album/SpotifyImage';
import styles from '~/scss/Catalog.scss';

class SpotifyBrowse extends Component {
	render() {
		const album = this.props.album;

		return (
			<li>
				<SpotifyImage album={album} />
				<div className={styles.meta}>
					<SpotifyLink album={album} />
				</div>
			</li>
		);
	}
}

export default Relay.createContainer( SpotifyBrowse, {
	fragments: {
		album: () => Relay.QL`
			fragment on Album {
				id
				name
				album_id
				images {
					url
					width
					height
				}
				artists {
					id
					name
				}
			}
		`,
	}
} );