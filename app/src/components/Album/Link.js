import React from 'react';
import Relay from 'react-relay';
import L10NLink from '../L10NLink';

/* eslint-disable react/prop-types */

function AlbumLink(props) {
  return <L10NLink to={`/album/${props.album.albumId}`}>{props.album.name}</L10NLink>;
}

export default Relay.createContainer(AlbumLink, {
  fragments: {
    album: () => Relay.QL`
      fragment on Album {
        albumId
        name
      }
    `,
  },
});
