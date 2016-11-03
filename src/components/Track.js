import React, { Component } from 'react';
import Relay from 'react-relay';
import classNames from 'classnames';
import Actions from '~/flux/Actions';
import Store from '~/flux/Store';
import '~/scss/Track.scss';

class Track extends Component {
	isCurrent() {
		const store = Store.getData();
		if ( ! store.track ) {
			return;
		}

		return store.track.trackId === this.props.track.trackId;
	}

	render() {
		const audio = Store.getAudio(),
			{ track, album } = this.props,
			current = this.isCurrent(),
			className = classNames( 'Track', {
				'Track-paused': current && audio.paused,
				'Track-playing': current && ! audio.paused,
				'Track-not-playing': ! current
			} );

		return (
			<li className={className} onClick={() => Actions.setSong( { track, album } ) }>
				<span className="Track-control">
					<span className="Track-control-text">{track.number}</span>
					<span className="dashicons dashicons-controls-play"></span>
					<span className="dashicons dashicons-controls-pause"></span>
				</span>
				<span className="Track-name">{track.name}</span>
				<span className="Track-length">{track.length}</span>
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