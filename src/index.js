import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import albums from './data/albums';

ReactDOM.render(
	<App albums={albums} />,
	document.getElementById('root')
);
