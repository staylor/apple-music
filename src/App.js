import React, { Component } from 'react';
import './App.css';
import Catalog from './Catalog';
import Player from './Player';

class App extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			audio: null,
			song: null,
			album: null
		};

		this.selectSong = this.selectSong.bind( this );
	}

	toggleControl() {
		var audio = this.state.audio;
		if ( ! this.state.audio ) {
			return;
		}

		if ( audio.paused ) {
			audio.play();
		} else {
			audio.pause();
		}
	}

	selectSong( song, album ) {
		var willPlay, willPause, audio;

		if ( this.state.audio ) {
			audio = this.state.audio;
		} else {
			audio = document.createElement( 'audio' );
			audio.ontimeupdate = function ( event ) {
				this.setState({
					currentTime: event.timeStamp
				});
			}.bind( this );
		}

		if ( this.state.song !== song ) {
			if ( audio.src && ! audio.paused ) {
				audio.pause();
			}
			if ( song.src ) {
				audio.src = '/audio/' + song.src;
				audio.load();
				willPlay = true;
			} else {
				this.audio.src = '';
			}
		} else {
			if ( audio.paused ) {
				willPlay = true;
			} else {
				willPause = true;
			}
		}

		if ( willPlay ) {
			audio.play();
		} else if ( willPause ) {
			audio.pause();
		}

		this.setState( {
			song,
			album,
			audio
		} );
	}

	render() {
		return (
			<div className="App">
				<div className="App-header">
					<h2>Apple Music</h2>
				</div>
				<p className="App-intro">
				I am going to recreate the Apple Music UI in React.
				Then Redux.
				Then with Relay.
				</p>

				<Player app={this} />
				<Catalog app={this} albums={this.props.albums} />

			</div>
		);
	}
}

export default App;
