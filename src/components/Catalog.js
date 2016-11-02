import React, { Component } from 'react';
import Album from '~/components/Album';
import '~/css/Catalog.css';

class Catalog extends Component {
	render() {
		return (
			<div className="Catalog">
				{this.props.albums.map( ( album ) =>
					<Album key={album.id} album={album} />
				)}
			</div>
		);
	 }
 }

 export default Catalog;