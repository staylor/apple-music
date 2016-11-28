import React from 'react';
import Relay from 'react-relay';
import ArtistLink from './Link';
import BrowseAlbum from '../Album/Browse';
import styles from './Artist.scss';
import catalogStyles from '../Catalog/Catalog.scss';

/* eslint-disable react/prop-types */

const Artist = ({ artist, artistAlbums }) => (
  <div className={styles.wrap}>
    <h1>{artist.name}</h1>
    <ul className={catalogStyles.albums}>
      {artistAlbums.results.map(album => <BrowseAlbum key={album.id} album={album} />)}
    </ul>
  </div>
);

export default Relay.createContainer(Artist, {
  initialVariables: {
    type: 'artistAlbums',
  },
  fragments: {
    artist: () => Relay.QL`
      fragment on ArtistInterface {
        name
        ${ArtistLink.getFragment('artist')}
      }
    `,
    artistAlbums: () => Relay.QL`
      fragment on Collection {
        results(type: $type) {
          id
          ${BrowseAlbum.getFragment('album')}
        }
      }
    `,
  },
});
