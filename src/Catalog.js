import React, { Component } from 'react';
import './Catalog.css';
import Album from './Album';

class Catalog extends Component {
	render() {
		return (
			<div className="Catalog">
				{this.props.albums.map((album) => {
					return <Album app={this.props.app} key={album.id} album={album}/>;
				})}
			</div>
		);
	 }
 }

 export default Catalog;