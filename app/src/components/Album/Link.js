// @flow

import React from 'react';
import Relay from 'react-relay';
import L10NLink from '~/containers/L10NLink';

/* eslint-disable react/prop-types */

const AlbumLink = ({ album }) => (
  <L10NLink to={`/album/${album.album_id}`}>{album.name}</L10NLink>
);

export default Relay.createContainer(AlbumLink, {
  fragments: {
    album: () => Relay.QL`
      fragment on AlbumInterface {
        album_id
        name
      }
    `,
  },
});
