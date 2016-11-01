import React, { Component } from 'react';
import Actions from '../flux/Actions';
import Store from '../flux/Store';
import '../css/Player.css';

class Player extends Component {

	render() {
		let audio = Store.getAudio(),
			{ song, album } = this.props,
			dashicon = 'play',
			styles = {
				width: '0%'
			},
			details;

		if ( song && song.name ) {
			styles.width = Math.floor( ( 100 / audio.duration ) * audio.currentTime ) + '%';
			dashicon = audio.paused ? 'play' : 'pause';
			details = <div className="Player-details">
				"{song.name}" <span>from</span> <em>{album.name}</em>
				&nbsp;<span>by</span> {album.artist.name}
			</div>;
		} else {
			details = <div className="Player-details">Nothing is playing.</div>;
		}

		return (
			<div className="Player">
				<div className={"Player-control dashicons dashicons-controls-" + dashicon}
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