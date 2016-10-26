import React, { Component } from 'react';
import './Player.css';

class Player extends Component {
	constructor( props ) {
		super( props );

		this.onClick = this.onClick.bind( this );
	}

	onClick() {
		this.props.app.toggleControl();
	}

	render() {
		var state = this.props.app.state,
			dashicon = 'play',
			styles = {
				width: '0%'
			},
			details;

		if ( state.song && state.song.name ) {
			styles.width = Math.floor( ( 100 / state.audio.duration ) * state.audio.currentTime ) + '%';
			dashicon = state.audio.paused ? 'play' : 'pause';
			details = <div className="Player-details">
				"{state.song.name}" <span>from</span> <em>{state.album.name}</em>
				&nbsp;<span>by</span> {state.album.artist.name}
			</div>;
		} else {
			details = <div className="Player-details">Nothing is playing.</div>;
		}

		return (
			<div className="Player">
				<div className={"Player-control dashicons dashicons-controls-" + dashicon} onClick={this.onClick}></div>
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