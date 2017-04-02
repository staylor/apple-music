import React, { PureComponent } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import ArtistLink from 'components/Artist/Link';
import AlbumLink from 'components/Album/Link';
import AlbumImage from 'components/Album/Image';
import styles from 'routes/Catalog/Catalog.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@withRelay({
  fragments: {
    album: () => Relay.QL`
      fragment on BrowseAlbum {
        ${AlbumLink.getFragment('album')}
        ${AlbumImage.getFragment('album')}
        artists {
          id
          ${ArtistLink.getFragment('artist')}
        }
      }
    `,
  },
})
export default class BrowseAlbum extends PureComponent {
  render() {
    const { album } = this.props;

    return (
      <li>
        <div className={styles.artwork}>
          <AlbumImage album={album} size="medium" />
        </div>
        <div className={styles.meta}>
          <AlbumLink album={album} />
          {album.artists.map(artist => <ArtistLink key={artist.id} artist={artist} />)}
        </div>
      </li>
    );
  }
}
