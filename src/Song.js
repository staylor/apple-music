import React, { Component } from 'react';
import './css/dashicons.css';
import './Song.css';

class Song extends Component {
	constructor( props ) {
		super( props );

		this.onClick = this.onClick.bind( this );
	}

	onClick() {
		this.props.app.selectSong(
			this.props.song,
			this.props.album
		);
	}

	render() {
		var song = this.props.song,
			state = this.props.app.state,
			className = 'Song';

		if ( state.song && state.song === song ) {
			if ( state.audio.paused ) {
				className += ' Song-paused';
			} else {
				className += ' Song-playing';
			}
		} else {
			className += ' Song-not-playing';
		}

		return (
			<li className={className} onClick={this.onClick}>
				<span className="Song-number">
					<span className="Song-number-text">{song.number}</span>
					<span className="dashicons dashicons-controls-play"></span>
					<span className="dashicons dashicons-controls-pause"></span>
				</span>
				<span className="Song-name">{song.name}</span>
				<span className="Song-length">{song.length}</span>
			</li>
		);
	}
}

export default Song;