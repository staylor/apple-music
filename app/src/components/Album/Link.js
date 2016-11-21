import React from 'react';
import L10NLink from '../L10NLink';

/* eslint-disable react/prop-types */

const AlbumLink = ({ album }) => (
  <L10NLink to={`/album/${album.albumId}`}>{album.name}</L10NLink>
);

export default AlbumLink;
