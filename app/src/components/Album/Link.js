import React from 'react';
import Relay from 'react-relay';
import L10NLink from '../L10NLink';

/* eslint-disable react/prop-types */

const AlbumLink = ({ album }) => (
  <L10NLink to={`/album/${album.id}`}>{album.name}</L10NLink>
);

export default Relay.createContainer(AlbumLink, {
  fragments: {
    album: () => Relay.QL`
      fragment on AlbumInterface {
        id
        name
      }
    `,
  },
});
