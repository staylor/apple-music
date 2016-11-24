import React from 'react';
import L10NLink from '../L10NLink';

/* eslint-disable react/prop-types */

const ArtistLink = ({ artist }) => (
  <L10NLink to={`/artist/${artist.id}`}>{artist.name}</L10NLink>
);

export default ArtistLink;
