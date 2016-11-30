import React from 'react';
import Relay from 'react-relay';
import BrowseAlbum from '../Album/Browse';
import styles from './Catalog.scss';

/* eslint-disable react/prop-types */

const limit = 50;

const doClick = (relay, lastCursor) => relay.setVariables({
  after: lastCursor,
});

const Catalog = ({ newReleases, relay }) => {
  const edges = newReleases.results.edges;
  const lastCursor = edges[edges.length - 1].cursor;

  return (
    <div className={styles.wrap}>
      <h2>New Releases</h2>
      {newReleases.results.pageInfo.hasPreviousPage ? <span onClick={() => doClick(relay, lastCursor)}>PREVIOUS</span> : ''}
      {newReleases.results.pageInfo.hasNextPage ? <span onClick={() => doClick(relay, lastCursor)}>NEXT</span> : ''}
      <ul className={styles.albums}>
        {newReleases.results.edges.map(({ node, cursor }) => (
          <BrowseAlbum key={cursor} album={node} />)
        )}
      </ul>
    </div>
  );
};

export default Relay.createContainer(Catalog, {
  initialVariables: {
    type: 'newReleases',
    first: limit,
    after: null,
  },
  fragments: {
    newReleases: () => Relay.QL`
      fragment on Collection {
        results(type: $type, first: $first, after: $after) {
          edges {
            node {
              ${BrowseAlbum.getFragment('album')}
            }
            cursor
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
        }
      }
    `,
  },
});
