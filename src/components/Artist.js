import React, { Component } from 'react';
import Relay from 'react-relay';
import Store from '~/flux/Store';
import BrowseAlbum from '~/components/Album/Browse';
import '~/scss/Artist.scss';

class Artist extends Component {
	getArtist() {
		let artistId;

		if ( this.props.artist ) {
			return this.props.artist;
		}

		if ( this.props.params && this.props.params.artistId ) {
			artistId = this.props.params.artistId;
			return Store.artistById( artistId );
		}
	}

	render() {
		const artist = this.getArtist(),
			albums = artist.albums.edges.map( edge => edge.node );

		return (
			<div className="Artist">
				<h1>{artist.name}</h1>
				<ul className="Artist-albums">
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