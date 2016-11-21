import React from 'react';
import Relay from 'react-relay';
import BrowseAlbum from '../Album/Browse';
import styles from './Artist.scss';

/* eslint-disable react/prop-types */

const Artist = ({ artist }) => (
  <div className={styles.wrap}>
    <h1>{artist.name}</h1>
    <ul className={styles.albums}>
      {artist.albums.edges.map(({ node }) => <BrowseAlbum key={node.id} album={node} />)}
    </ul>
  </div>
);

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
