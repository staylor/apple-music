import React from 'react';
import Relay from 'react-relay';
import L10NLink from '../L10NLink';

/* eslint-disable react/prop-types */

const ArtistLink = ({ artist }) => (
  <L10NLink to={`/artist/${artist.id}`}>{artist.name}</L10NLink>
);

export default Relay.createContainer(ArtistLink, {
  fragments: {
    artist: () => Relay.QL`
      fragment on ArtistInterface {
        id
        name
      }
    `,
  },
});
