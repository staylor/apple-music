import React, { Component } from 'react';
import { Link } from 'react-router';

class AlbumImage extends Component {
	render() {
		const album = this.props.album;

		return <Link to={"/album/" + album.id}>
			<img role="presentation" src={'/images/' + album.image}/>
		</Link>;
	}
}

export default AlbumImage;