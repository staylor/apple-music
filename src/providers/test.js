import Spotify from './Spotify';

let api = new Spotify();

api.getAlbum( '3X801hUAmbUAHmatvmMhfA' ).then( response => {
	console.log( response.tracks.items[0] );
} ).catch( ex => console.log( ex ) );