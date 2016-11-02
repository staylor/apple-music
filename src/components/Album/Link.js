import React, { Component } from 'react';
import { Link } from 'react-router';

class AlbumLink extends Component {
	render() {
		const album = this.props.album;

		return <Link to={"/album/" + album.id}>{album.name}</Link>;
	}
}

export default AlbumLink;