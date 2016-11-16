import React from 'react';
import L10NLink from '../L10NLink';

/* eslint-disable react/prop-types */

function AlbumLink(props) {
  const { albumId, name } = props.album;

  return <L10NLink to={`/album/${albumId}`}>{name}</L10NLink>;
}

export default AlbumLink;
