import React, { PureComponent } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import ArtistImage from 'components/Artist/Image';
import ArtistLink from 'components/Artist/Link';
import styles from 'routes/Catalog/Catalog.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@withRelay({
  fragments: {
    artist: () => Relay.QL`
      fragment on Artist {
        ${ArtistImage.getFragment('artist')}
        ${ArtistLink.getFragment('artist')}
      }
    `,
  },
})
export default class RelatedArtist extends PureComponent {
  render() {
    const { artist } = this.props;
    return (
      <li>
        <div className={styles.artwork}>
          <ArtistImage artist={artist} />
        </div>
        <div className={styles.meta}>
          <ArtistLink artist={artist} />
        </div>
      </li>
    );
  }
}
