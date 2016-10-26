import React, { Component } from 'react';

class Playing extends Component {
	render() {
		var song = this.props.song;

		return (
			<div>
			Now Playing: {song.name}
			</div>
		);
	}
}

export default Playing;