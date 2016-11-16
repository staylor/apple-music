import React from 'react';
import L10NLink from '../L10NLink';

/* eslint-disable react/prop-types */

function ArtistLink(props) {
  const { artistId, name } = props.artist;

  return <L10NLink to={`/artist/${artistId}`}>{name}</L10NLink>;
}

export default ArtistLink;
