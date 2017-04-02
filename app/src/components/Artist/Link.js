import React, { PureComponent } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import L10NLink from 'components/L10NLink';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@withRelay({
  fragments: {
    artist: () => Relay.QL`
      fragment on ArtistInterface {
        artist_id
        name
      }
    `,
  },
})
export default class ArtistImage extends PureComponent {
  render() {
    const { artist } = this.props;
    return (
      <L10NLink to={`/artist/${artist.artist_id}`}>{artist.name}</L10NLink>
    );
  }
}
