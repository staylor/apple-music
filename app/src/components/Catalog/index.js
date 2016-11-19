import React from 'react';
import Relay from 'react-relay';
import Album from '../Album';
import styles from './Catalog.scss';

/* eslint-disable react/prop-types */

const Catalog = props => (
  <div className={styles.wrap}>
    {props.albums.map(album => <Album key={album.id} album={album} />)}
  </div>
);

export default Relay.createContainer(Catalog, {
  fragments: {
    albums: () => Relay.QL`
      fragment on Collection {
        results {
          id
          ${Album.getFragment('album')}
        }
      }
    `,
  },
});
