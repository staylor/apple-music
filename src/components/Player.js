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
			{ track, album } = this.props;

		let dashicon = 'play',
			cssStyles = {
				width: '0%'
			},
			details;

		if ( track && track.name ) {
			cssStyles.width = `${Math.floor( ( 100 / audio.duration ) * audio.currentTime )}%`;
			dashicon = audio.paused ? 'play' : 'pause';
			details = <div className={styles.PlayerDetails}>
				"{track.name}" <span><FormattedMessage id="player.from" /></span>
				&nbsp;<em><AlbumLink album={album} /></em>
				&nbsp;<span><FormattedMessage id="player.by" /></span>
				&nbsp;<ArtistLink artist={album.artist} />
			</div>;
		} else {
			details = <div className={styles.PlayerDetails}><FormattedMessage id="player.nothing" /></div>;
		}

		return (
			<div className={styles.Player}>
				<div className={`${styles.PlayerControl} dashicons dashicons-controls-${dashicon}`}
					onClick={Actions.toggleControl}></div>
				<div className={styles.PlayerMetadata}>
					{details}
					<div className={styles.PlayerTrack}>
						<div className={styles.PlayerProgress} style={cssStyles}></div>
					</div>
				</div>
			 </div>
		);
	}
}

export default Player;