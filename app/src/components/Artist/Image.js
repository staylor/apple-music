// @flow

import React from 'react';
import Relay from 'react-relay';
import classNames from 'classnames';
import L10NLink from '../L10NLink';
import styles from './Artist.scss';

/* eslint-disable react/prop-types */

const ArtistImage = ({ artist }) => {
  const image = artist.images[0];
  const cssClasses = {
    [styles.landscape]: image.width > image.height,
    [styles.portrait]: image.width < image.height,
    [styles.square]: image.width === image.height,
  };

  return (
    <L10NLink to={`/artist/${artist.artist_id}`}>
      {artist.images.length ? <img className={classNames(cssClasses)} role="presentation" src={image.url} /> : ''}
    </L10NLink>
  );
};

export default Relay.createContainer(ArtistImage, {
  fragments: {
    artist: () => Relay.QL`
      fragment on Artist {
        artist_id
        images {
          url
          width
          height
        }
      }
    `,
  },
});
