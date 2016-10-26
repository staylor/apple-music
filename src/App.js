import React, { Component } from 'react';
import './App.css';
import Catalog from './Catalog';
import Playing from './Playing';

class App extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			song: null
		};
		this.selectSong = this.selectSong.bind( this );
	}

	selectSong( song ) {
		this.setState({ song });
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

				<Catalog app={this} albums={this.props.albums} />

				{this.state.song && <Playing song={this.state.song} />}
			</div>
		);
	}
}

export default App;
