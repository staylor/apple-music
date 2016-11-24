import React from 'react';
import Relay from 'react-relay';
import styles from './Artist.scss';

/* eslint-disable react/prop-types */

const Artist = ({ artist }) => (
  <div className={styles.wrap}>
    <h1>{artist.name}</h1>

  </div>
);

export default Relay.createContainer(Artist, {
  fragments: {
    artist: () => Relay.QL`
      fragment on Artist {
        artistId
        name
      }
    `,
  },
});
