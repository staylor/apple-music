import React from 'react';
import L10NLink from '../L10NLink';

/* eslint-disable react/prop-types */

function AlbumImage(props) {
  const { albumId, image } = props.album;

  return (
    <L10NLink to={`/album/${albumId}`}>
      <img role="presentation" src={`/images/${image}`} />
    </L10NLink>
  );
}

export default AlbumImage;
