import Spotify from './Spotify';

let api = new Spotify();

api.getAlbums().then( response => {
	console.log( response.results[0].artists[0] );
} ).catch( ex => console.log( ex ) );