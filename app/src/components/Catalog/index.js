import React from 'react';
import Relay from 'react-relay';
import BrowseAlbum from '../Album/Browse';
import SortButton from './SortButton';
import styles from './Catalog.scss';

/* eslint-disable react/prop-types */

const Catalog = ({ newReleases, relay }) => (
  <div className={styles.wrap}>
    <SortButton sort="popular" relay={relay}>Popular</SortButton>
    {' '}
    <SortButton sort="az" relay={relay}>A to Z</SortButton>
    {' '}
    <SortButton sort="za" relay={relay}>Z to A</SortButton>

    <ul className={styles.albums}>
      {newReleases.results.map(album => <BrowseAlbum key={album.id} album={album} />)}
    </ul>
  </div>
);

export default Relay.createContainer(Catalog, {
  initialVariables: {
    sort: 'default',
  },
  fragments: {
    newReleases: () => Relay.QL`
      fragment on Collection {
        results(sort: $sort) {
          id
          ${BrowseAlbum.getFragment('album')}
        }
      }
    `,
  },
});
