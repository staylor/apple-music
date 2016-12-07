// @flow

import React from 'react';
import Relay from 'react-relay';
import L10NLink from '~/containers/L10NLink';

/* eslint-disable react/prop-types */

const AlbumImage = ({ album, size = 'large' }) => {
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
      <img role="presentation" src={url} />
    </L10NLink>
  );
};

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
