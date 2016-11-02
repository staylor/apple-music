import React from 'react';
import ReactDOM from 'react-dom';
import App from '~/components/App';
import Store from '~/flux/Store';
import '~/css/index.css';
import albums from '~/data/albums';

Store.init( {
	song: null,
	album: null,
	currentTime: null,
	albums: albums,
} );

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
