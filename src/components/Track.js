import React, { Component } from 'react';
import Relay from 'react-relay';
import classNames from 'classnames';
import Actions from '~/flux/Actions';
import Store from '~/flux/Store';
import styles from '~/scss/Track.scss';

class Track extends Component {
	isCurrent() {
		const store = Store.getData();
		if ( ! store.track ) {
			return;
		}

		return parseInt( store.track, 10 ) === this.props.track.trackId;
	}

	render() {
		const audio = Store.getAudio(),
			{ track, album } = this.props,
			current = this.isCurrent(),
			className = classNames( styles.Track, {
				[styles.TrackPaused]: current && audio.paused,
				[styles.TrackPlaying]: current && ! audio.paused,
				[styles.TrackNotPlaying]: ! current
			} );

		return (
			<li className={className} onClick={() => {
				this.isCurrent() ?
				Actions.toggleControl() :
				Actions.setSong( { track, album } )
			}}>
				<span className={styles.TrackControl}>
					<span className={styles.TrackControlText}>{track.number}</span>
					<span className={`dashicons dashicons-controls-play ${styles['dashicons-controls-play']}`}></span>
					<span className={`dashicons dashicons-controls-pause ${styles['dashicons-controls-pause']}`}></span>
				</span>
				<span className={styles.TrackName}>{track.name}</span>
				<span className={styles.TrackLength}>{track.length}</span>
			</li>
		);
	}
}

export default Relay.createContainer( Track, {
	fragments: {
		track: () => Relay.QL`
			fragment on Track {
				id,
				trackId,
				number,
				name,
				length,
				src
			}
		`
	}
} );