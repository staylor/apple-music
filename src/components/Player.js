import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Actions from '~/flux/Actions';
import Store from '~/flux/Store';
import AlbumLink from '~/components/Album/Link';
import ArtistLink from '~/components/Artist/Link';
import styles from '~/scss/Player.scss';

class Player extends Component {

	render() {
		const audio = Store.getAudio(),
			{ album, track } = this.props;

		let artist = null,
			dashicon = 'play',
			cssStyles = {
				width: '0%'
			},
			details;

		if ( album ) {
			album.artist.edges.map( ({ node }) => artist = node );
		}

		if ( track && track.name ) {
			cssStyles.width = `${Math.floor( ( 100 / audio.duration ) * audio.currentTime )}%`;
			dashicon = audio.paused ? 'play' : 'pause';
			details = <div className={styles.details}>
				"{track.name}" <span><FormattedMessage id="player.from" /></span>
				&nbsp;<em><AlbumLink album={album} /></em>
				&nbsp;<span><FormattedMessage id="player.by" /></span>
				&nbsp;<ArtistLink artist={artist} />
			</div>;
		} else {
			details = <div className={styles.details}><FormattedMessage id="player.nothing" /></div>;
		}

		return (
			<div className={styles.wrap}>
				<div className={`${styles.control} dashicons dashicons-controls-${dashicon}`}
					onClick={Actions.toggleControl}></div>
				<div className={styles.metadata}>
					{details}
					<div className={styles.track}>
						<div className={styles.progress} style={cssStyles}></div>
					</div>
				</div>
			 </div>
		);
	}
}

export default Player;