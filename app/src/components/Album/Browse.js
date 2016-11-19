import React from 'react';
import Relay from 'react-relay';
import AlbumLink from './Link';
import AlbumImage from './Image';

/* eslint-disable react/prop-types */

const BrowseAlbum = props => (
  <li>
    <AlbumImage album={props.album} />
    <AlbumLink album={props.album} />
  </li>
);

export default Relay.createContainer(BrowseAlbum, {
  fragments: {
    album: () => Relay.QL`
      fragment on Album {
        ${AlbumLink.getFragment('album')}
        ${AlbumImage.getFragment('album')}
      }
    `,
  },
});
