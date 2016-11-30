// @flow

import React from 'react';
import Relay from 'react-relay';
import { FormattedMessage } from 'react-intl';
import Loading from '../Loading';
import BrowseAlbum from '../Album/Browse';
import styles from './Catalog.scss';

/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */

const limit = 50;
const total = 500;

const CatalogWrap = ({ children }) => (
  <div className={styles.wrap}>
    <h2>New Releases</h2>
    {children}
  </div>
);

// this is copied from types/Collection
const idxPrefix = 'idx---';
const fromBase64 = (encoded: string): string => Buffer.from(encoded, 'base64').toString('utf8');
const indexFromCursor = (cursor: string): number => parseInt(fromBase64(cursor).replace(idxPrefix, ''), 10);
const hasPreviousPage = (startCursor: string): boolean => indexFromCursor(startCursor) > 0;
const hasNextPage = (endCursor: string): boolean => {
  const idx = indexFromCursor(endCursor) + 1;
  if ((idx + limit) > total) {
    return false;
  }
  return idx % limit === 0;
}

const Catalog = ({ newReleases, relay }) => {
  const edges = newReleases.results.edges;
  const pageInfo = newReleases.results.pageInfo;

  if (relay.pendingVariables) {
    return (
      <CatalogWrap>
        <Loading />
      </CatalogWrap>
    );
  }

  const hasPrevious = pageInfo.startCursor && hasPreviousPage(pageInfo.startCursor);
  const hasNext = pageInfo.endCursor && hasNextPage(pageInfo.endCursor);

  return (
    <CatalogWrap>
      {hasPrevious ?
        <span
          className={styles.prev}
          onClick={() => relay.setVariables({
            before: pageInfo.startCursor,
            last: limit,
            after: null,
            first: null,
          })}
        >
          <FormattedMessage id="previous" />
        </span> : ''}
      {hasPrevious && hasNext ? <span> &bull; </span> : ''}
      {hasNext ?
        <span
          className={styles.next}
          onClick={() => relay.setVariables({
            after: pageInfo.endCursor,
            first: limit,
            before: null,
            last: null,
          })}
        >
          <FormattedMessage id="next" />
        </span> : ''}
      <ul className={styles.albums}>
        {edges.map(({ node, cursor }) => <BrowseAlbum key={cursor} album={node} />)}
      </ul>
    </CatalogWrap>
  );
};

export default Relay.createContainer(Catalog, {
  initialVariables: {
    type: 'newReleases',
    first: limit,
    last: null,
    after: null,
    before: null,
  },
  fragments: {
    newReleases: () => Relay.QL`
      fragment on Collection {
        results(type: $type, first: $first, last: $last, after: $after, before: $before) {
          edges {
            node {
              ${BrowseAlbum.getFragment('album')}
            }
            cursor
          }
          pageInfo {
            startCursor
            endCursor
          }
        }
      }
    `,
  },
});
