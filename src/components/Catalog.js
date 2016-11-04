import React, { Component } from 'react';
import Relay from 'react-relay';
import Album from '~/components/Album';
import styles from '~/scss/Catalog.scss';

class Catalog extends Component {
	render() {
		const { results } = this.props.albums;

		return (
			<div className={styles.wrap}>
				{results.map( album => <Album key={album.__dataID__} album={album} />)}
			</div>
		);
	 }
 }

 export default Relay.createContainer( Catalog, {
	fragments: {
		albums: () => Relay.QL`
			fragment on Collection {
				results {
					${Album.getFragment( 'album' )}
				}
			}
		`,
	}
 } );