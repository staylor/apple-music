import React, { Component } from 'react';
import '../css/Catalog.css';
import Album from './Album';

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