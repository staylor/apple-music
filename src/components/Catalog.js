import React, { Component } from 'react';
import Store from '~/flux/Store';
import Album from '~/components/Album';
import '~/scss/Catalog.scss';

class Catalog extends Component {
	render() {
		const store = Store.getData();

		return (
			<div className="Catalog">
				{store.catalog.map( ( album ) =>
					<Album key={album.id} album={album} />
				)}
			</div>
		);
	 }
 }

 export default Catalog;