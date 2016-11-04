import React, { Component } from 'react';
import Relay from 'react-relay';
import SpotifyBrowse from '~/components/Album/SpotifyBrowse';
import styles from '~/scss/Catalog.scss';

class SpotifyCatalog extends Component {
	render() {
		const { results } = this.props.albums;

		return (
			<ul className={styles.albums}>
				{results.map( album => <SpotifyBrowse key={album.id} album={album} />)}
			</ul>
		);
	 }
 }

 export default Relay.createContainer( SpotifyCatalog, {
	fragments: {
		albums: () => Relay.QL`
			fragment on Collection {
				results {
					id
					${SpotifyBrowse.getFragment( 'album' )}
				}
			}
		`,
	}
 } );