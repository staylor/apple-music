import React, { Component } from 'react';
import { Link } from 'react-router';
import Store from '~/flux/Store';
import Player from '~/components/Player';
import '~/css/dashicons.css';
import '~/scss/App.scss';

class App extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			...Store.getData()
		};

		Store.addListener( 'change', () => {
			this.setState( {
				...Store.getData()
			} );
		} );
	}

	render() {
		const { album, song } = this.state;

		return (
			<div className="App">
				<div className="App-header">
					<h2><Link to="/">Apple Music</Link></h2>
				</div>
				<p className="App-intro">
				I am going to recreate the Apple Music UI in React.
				Then Flux.
				Then with Relay.
				</p>
				<Player album={album} song={song}/>
				{this.props.children}
			</div>
		);
	}
}

export default App;
