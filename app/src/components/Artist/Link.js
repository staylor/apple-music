import React from 'react';
import Relay from 'react-relay';
import L10NLink from '../L10NLink';

/* eslint-disable react/prop-types */

function ArtistLink(props) {
  return <L10NLink to={`/artist/${props.artist.artistId}`}>{props.artist.name}</L10NLink>;
}

export default Relay.createContainer(ArtistLink, {
  fragments: {
    artist: () => Relay.QL`
      fragment on Artist {
        artistId
        name
      }
    `,
  },
});
