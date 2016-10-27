import React, { Component } from 'react';
import classNames from 'classnames';
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
			currentSong = state.song && state.song === song,
			className = classNames( 'Song', {
				'Song-paused': currentSong && state.audio.paused,
				'Song-playing': currentSong && ! state.audio.paused,
				'Song-not-playing': ! currentSong
			} );

		return (
			<li className={className} onClick={this.onClick}>
				<span className="Song-control">
					<span className="Song-control-text">{song.number}</span>
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