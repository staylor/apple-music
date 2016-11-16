import React from 'react';
import Relay from 'react-relay';
import Album from '../Album';
import styles from './styles.scss';

/* eslint-disable react/prop-types */

function Catalog(props) {
  const { results } = props.albums;

  return (
    <div className={styles.wrap}>
      {results.map(album => <Album key={album.id} album={album} />)}
    </div>
  );
}

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
