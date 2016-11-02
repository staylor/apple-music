import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Actions from '~/flux/Actions';
import Store from '~/flux/Store';
import AlbumLink from '~/components/Album/Link';
import ArtistLink from '~/components/Artist/Link';
import '~/scss/Player.scss';

class Player extends Component {

	render() {
		const audio = Store.getAudio(),
			{ song, album } = this.props;

		let dashicon = 'play',
			styles = {
				width: '0%'
			},
			details;

		if ( song && song.name ) {
			styles.width = `${Math.floor( ( 100 / audio.duration ) * audio.currentTime )}%`;
			dashicon = audio.paused ? 'play' : 'pause';
			details = <div className="Player-details">
				"{song.name}" <span><FormattedMessage id="player.from" /></span>
				&nbsp;<em><AlbumLink album={album} /></em>
				&nbsp;<span><FormattedMessage id="player.by" /></span>
				&nbsp;<ArtistLink artist={album.artist} />
			</div>;
		} else {
			details = <div className="Player-details"><FormattedMessage id="player.nothing" /></div>;
		}

		return (
			<div className="Player">
				<div className={`Player-control dashicons dashicons-controls-${dashicon}`}
					onClick={Actions.toggleControl}></div>
				<div className="Player-metadata">
					{details}
					<div className="Player-track">
						<div className="Player-progress" style={styles}></div>
					</div>
				</div>
			 </div>
		);
	}
}

export default Player;