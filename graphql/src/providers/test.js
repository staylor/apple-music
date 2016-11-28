import Spotify from './Spotify';

/* eslint-disable no-console */

const api = new Spotify();

api.getArtistAlbums('4xtWjIlVuZwTCeqVAsgEXy').then((response) => {
  console.log(response.items);
}).catch(ex => console.log(ex));
