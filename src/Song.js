import React, { Component } from 'react';
import './Song.css';

class Song extends Component {
	constructor( props ) {
		super( props );

		this.onClick = this.onClick.bind( this );
	}

	onClick() {
		this.props.app.selectSong( this.props.song );
	}

	render() {
		var song = this.props.song,
			state = this.props.app.state,
			className = 'Song';

		if ( state.song && state.song === song ) {
			className += ' Song-playing';
		}

		return (
			<li className={className} onClick={this.onClick}>
				<span className="Song-number">{song.number}</span>
				<span className="Song-name">{song.name}</span>
				<span className="Song-length">{song.length}</span>
			</li>
		);
	}
}

export default Song;