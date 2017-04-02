import React, { PureComponent } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import L10NLink from 'components/L10NLink';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@withRelay({
  fragments: {
    album: () => Relay.QL`
      fragment on AlbumInterface {
        album_id
        images {
          url
        }
      }
    `,
  },
})
export default class BrowseAlbum extends PureComponent {
  render() {
    const { album, size = 'large' } = this.props;

    let url;
    switch (size) {
      case 'medium':
        url = album.images[1].url;
        break;
      case 'small':
        url = album.images[2].url;
        break;
      default:
        url = album.images[0].url;
        break;
    }

    return (
      <L10NLink to={`/album/${album.album_id}`}>
        <img alt="" role="presentation" src={url} />
      </L10NLink>
    );
  }
}
