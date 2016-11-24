import React from 'react';
import L10NLink from '../L10NLink';

/* eslint-disable react/prop-types */

const AlbumImage = ({ album }) => (
  <L10NLink to={`/album/${album.albumId}`}>
    <img role="presentation" src={album.image.url} />
  </L10NLink>
);

export default AlbumImage;
