import React, { Component } from 'react';
import Relay from 'react-relay';
import BrowseAlbum from '~/components/Album/Browse';
import styles from '~/scss/Artist.scss';

class Artist extends Component {
	render() {
		const artist = this.props.artist,
			albums = artist.albums.edges.map( edge => edge.node );

		return (
			<div className={styles.wrap}>
				<h1>{artist.name}</h1>
				<ul className={styles.albums}>
				{albums.map( album => <BrowseAlbum key={album.id} album={album} /> )}
				</ul>
			</div>
		);
	}
}

export default Relay.createContainer( Artist, {
	fragments: {
		artist: () => Relay.QL`
			fragment on Artist {
				artistId
				name
				albums(first: 10) {
					edges {
						cursor
						node {
							id
							albumId
							name
							image
						}
					}
				},
			}
		`,
	}
} );