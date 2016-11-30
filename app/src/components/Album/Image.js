// @flow

import React from 'react';
import Relay from 'react-relay';
import L10NLink from '../L10NLink';

/* eslint-disable react/prop-types */

const AlbumImage = ({ album }) => (
  <L10NLink to={`/album/${album.album_id}`}>
    <img role="presentation" src={album.images[0].url} />
  </L10NLink>
);

export default Relay.createContainer(AlbumImage, {
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
});
