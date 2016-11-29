import React from 'react';
import Relay from 'react-relay';
import ArtistImage from './Image';
import ArtistLink from './Link';
import styles from '../Catalog/Catalog.scss';

/* eslint-disable react/prop-types */

const RelatedArtist = ({ artist }) => (
  <li>
    <div className={styles.artwork}>
      <ArtistImage artist={artist} />
    </div>
    <div className={styles.meta}>
      <ArtistLink artist={artist} />
    </div>
  </li>
);

export default Relay.createContainer(RelatedArtist, {
  fragments: {
    artist: () => Relay.QL`
      fragment on Artist {
        ${ArtistImage.getFragment('artist')}
        ${ArtistLink.getFragment('artist')}
      }
    `,
  },
});
