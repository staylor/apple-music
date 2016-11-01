import React, { Component } from 'react';
import classNames from 'classnames';
import Actions from '../flux/Actions';
import Store from '../flux/Store';
import '../css/dashicons.css';
import '../css/Song.css';

class Song extends Component {
	render() {
		const store = Store.getData(),
			audio = Store.getAudio(),
			{ song, album } = this.props,
			currentSong = store.song.id === song.id,
			className = classNames( 'Song', {
				'Song-paused': currentSong && audio.paused,
				'Song-playing': currentSong && ! audio.paused,
				'Song-not-playing': ! currentSong
			} );

		return (
			<li className={className} onClick={() => Actions.setSong( { song, album } ) }>
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