import React, { Component } from 'react';
import Relay from 'react-relay';
import Album from '~/components/Album';
import '~/scss/Catalog.scss';

class Catalog extends Component {
	render() {
		return (
			<div className="Catalog">
				{this.props.catalog.map( ( album ) =>
					<Album key={album.id} album={album} />
				)}
			</div>
		);
	 }
 }

 export default Relay.createContainer( Catalog, {
	fragments: {
		catalog: () => Relay.QL`
			fragment on Collection {
				results {
					${Album.getFragment( 'album' )}
				}
			}
		`,
	}
 } );