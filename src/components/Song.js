import React, { Component } from 'react';
import classNames from 'classnames';
import Actions from '~/flux/Actions';
import Store from '~/flux/Store';
import '~/scss/Song.scss';

class Song extends Component {
	isCurrent() {
		const store = Store.getData();
		if ( ! store.song ) {
			return;
		}

		return store.song.id === this.props.song.id;
	}

	render() {
		const audio = Store.getAudio(),
			{ song, album } = this.props,
			current = this.isCurrent(),
			className = classNames( 'Song', {
				'Song-paused': current && audio.paused,
				'Song-playing': current && ! audio.paused,
				'Song-not-playing': ! current
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