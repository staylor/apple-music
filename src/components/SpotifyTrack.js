import React, { Component } from 'react';
import Relay from 'react-relay';
import classNames from 'classnames';
import Actions from '~/flux/Actions';
import Store from '~/flux/Store';
import styles from '~/scss/Track.scss';

class SpotifyTrack extends Component {
	isCurrent() {
		const store = Store.getData();
		if ( ! store.track ) {
			return;
		}

		return parseInt( store.track, 10 ) === this.props.track.track_id;
	}

	render() {
		const audio = Store.getAudio(),
			{ track, album } = this.props,
			current = this.isCurrent(),
			className = classNames( styles.item, {
				[styles.paused]: current && audio.paused,
				[styles.playing]: current && ! audio.paused,
				[styles.notPlaying]: ! current
			} );

		return (
			<li className={className} onClick={() => {
				this.isCurrent() ?
				Actions.toggleControl() :
				Actions.setSong( { track, album } )
			}}>
				<span className={styles.control}>
					<span className={styles.text}>{track.track_number}</span>
					<span className={`dashicons dashicons-controls-play ${styles['dashicons-controls-play']}`}></span>
					<span className={`dashicons dashicons-controls-pause ${styles['dashicons-controls-pause']}`}></span>
				</span>
				<span className={styles.name}>{track.name}</span>
				<span className={styles.length}>{track.duration_ms}</span>
			</li>
		);
	}
}

export default Relay.createContainer( SpotifyTrack, {
	fragments: {
		track: () => Relay.QL`
			fragment on Track {
				id,
				track_number,
				name,
				duration_ms,
				preview_url
			}
		`
	}
} );
