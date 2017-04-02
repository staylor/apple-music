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
        name
      }
    `,
  },
})
export default class AlbumLink extends PureComponent {
  render() {
    const { album } = this.props;

    return (
      <L10NLink to={`/album/${album.album_id}`}>{album.name}</L10NLink>
    );
  }
}
