// @flow

import React from 'react';
import Relay from 'react-relay';
import L10NLink from '~/containers/L10NLink';

/* eslint-disable react/prop-types */

const ArtistLink = ({ artist }) => (
  <L10NLink to={`/artist/${artist.artist_id}`}>{artist.name}</L10NLink>
);

export default Relay.createContainer(ArtistLink, {
  fragments: {
    artist: () => Relay.QL`
      fragment on ArtistInterface {
        artist_id
        name
      }
    `,
  },
});
