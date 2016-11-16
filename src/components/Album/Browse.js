import React from 'react';
import AlbumLink from './Link';
import AlbumImage from './Image';

/* eslint-disable react/prop-types */

function BrowseAlbum(props) {
  const album = props.album;

  return (
    <li>
      <AlbumImage album={album} />
      <AlbumLink album={album} />
    </li>
  );
}

export default BrowseAlbum;
