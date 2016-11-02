import React, { Component } from 'react';
import Store from '~/flux/Store';
import Catalog from '~/components/Catalog';
import Player from '~/components/Player';
import '~/css/App.css';

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
		const { albums, album, song } = this.state;

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

				<Player album={album} song={song}/>
				<Catalog albums={albums}/>

			</div>
		);
	}
}

export default App;
