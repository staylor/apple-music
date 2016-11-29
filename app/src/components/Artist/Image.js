import React from 'react';
import Relay from 'react-relay';
import L10NLink from '../L10NLink';

/* eslint-disable react/prop-types */

const ArtistImage = ({ artist }) => (
  <L10NLink to={`/artist/${artist.artist_id}`}>
    {artist.images.length ? <img role="presentation" src={artist.images[0].url} /> : ''}
  </L10NLink>
);

export default Relay.createContainer(ArtistImage, {
  fragments: {
    artist: () => Relay.QL`
      fragment on Artist {
        artist_id
        images {
          url
        }
      }
    `,
  },
});
