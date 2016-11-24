import React from 'react';
import Relay from 'react-relay';
import ArtistLink from '../Artist/Link';
import AlbumLink from '../Album/Link';
import AlbumImage from './Image';
import styles from '../Catalog/Catalog.scss';

/* eslint-disable react/prop-types */

const BrowseAlbum = ({ album }) => (
  <li>
    <AlbumImage album={album} />
    <div className={styles.meta}>
      <AlbumLink album={album} />
      {album.artists.map(artist => <ArtistLink key={artist.id} artist={artist} />)}
    </div>
  </li>
);

export default Relay.createContainer(BrowseAlbum, {
  fragments: {
    album: () => Relay.QL`
      fragment on BrowseAlbum {
        id
        name
        images {
          url
        }
        artists {
          id
          name
        }
      }
    `,
  },
});
