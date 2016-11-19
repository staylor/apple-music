import React from 'react';
import Relay from 'react-relay';
import L10NLink from '../L10NLink';

/* eslint-disable react/prop-types */

const AlbumImage = props => (
  <L10NLink to={`/album/${props.album.albumId}`}>
    <img role="presentation" src={`/images/${props.album.image}`} />
  </L10NLink>
);

export default Relay.createContainer(AlbumImage, {
  fragments: {
    album: () => Relay.QL`
      fragment on Album {
        albumId
        image
      }
    `,
  },
});
