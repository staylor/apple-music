import React from 'react';
import Relay from 'react-relay';
import BrowseAlbum from '../Album/Browse';
import styles from './Artist.scss';

/* eslint-disable react/prop-types */

function Artist(props) {
  const artist = props.artist;
  const albums = artist.albums.edges.map(edge => (edge.node));

  return (
    <div className={styles.wrap}>
      <h1>{artist.name}</h1>
      <ul className={styles.albums}>
        {albums.map(album => <BrowseAlbum key={album.id} album={album} />)}
      </ul>
    </div>
  );
}

export default Relay.createContainer(Artist, {
  fragments: {
    artist: () => Relay.QL`
      fragment on Artist {
        artistId
        name
        albums(first: 10) {
          edges {
            cursor
            node {
              id
              ${BrowseAlbum.getFragment('album')}
            }
          }
        },
      }
    `,
  },
});
