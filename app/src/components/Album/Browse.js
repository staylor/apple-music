import React from 'react';
import Relay from 'react-relay';
import AlbumLink from './Link';
import AlbumImage from './Image';

/* eslint-disable react/prop-types */

const BrowseAlbum = ({ album }) => (
  <li>
    <AlbumImage album={album} />
    <AlbumLink album={album} />
  </li>
);

export default Relay.createContainer(BrowseAlbum, {
  fragments: {
    album: () => Relay.QL`
      fragment on Album {
        albumId
        name
        image
      }
    `,
  },
});
