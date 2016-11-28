import React from 'react';
import Relay from 'react-relay';
import BrowseAlbum from '../Album/Browse';
import styles from './Catalog.scss';

/* eslint-disable react/prop-types */

const sortMap = [
  ['popular', 'Popular'],
  ['az', 'A to Z'],
  ['za', 'Z to A'],
];

const Catalog = props => (
  <div className={styles.wrap}>
    Sort:{' '}
    {sortMap.map(([key, value]) => (
      <button
        key={key}
        onClick={() => props.relay.setVariables({ sort: key })}
      >
        {value}
      </button>
    ))}

    Show:{' '}
    {[10, 25, 50].map(limit => (
      <button
        key={limit}
        onClick={() => props.relay.setVariables({ limit })}
      >
        {limit}
      </button>
    ))}

    <ul className={styles.albums}>
      {props.newReleases.results.map(album => <BrowseAlbum key={album.id} album={album} />)}
    </ul>
  </div>
);

export default Relay.createContainer(Catalog, {
  initialVariables: {
    sort: 'default',
    limit: 10,
    type: 'newReleases',
  },
  fragments: {
    newReleases: () => Relay.QL`
      fragment on Collection {
        results(sort: $sort, limit: $limit, type: $type) {
          id
          ${BrowseAlbum.getFragment('album')}
        }
      }
    `,
  },
});
