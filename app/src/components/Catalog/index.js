import React from 'react';
import Relay from 'react-relay';
import BrowseAlbum from '../Album/Browse';
import styles from './Catalog.scss';

/* eslint-disable react/prop-types */

const Catalog = props => (
  <div className={styles.wrap}>
    <ul className={styles.albums}>
      {props.newReleases.results.map(album => <BrowseAlbum key={album.id} album={album} />)}
    </ul>
  </div>
);

export default Relay.createContainer(Catalog, {
  initialVariables: {
    type: 'newReleases',
  },
  fragments: {
    newReleases: () => Relay.QL`
      fragment on Collection {
        results(type: $type) {
          id
          ${BrowseAlbum.getFragment('album')}
        }
      }
    `,
  },
});
