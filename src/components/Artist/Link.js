import React, { Component } from 'react';
import { Link } from 'react-router';

class ArtistLink extends Component {
	render() {
		const artist = this.props.artist;

		return <Link to={"/artist/" + artist.id}>{artist.name}</Link>;
	}
}

export default ArtistLink;