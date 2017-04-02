import React, { PureComponent } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import classNames from 'classnames';
import L10NLink from 'components/L10NLink';
import styles from './Image.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@withRelay({
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
})
export default class ArtistImage extends PureComponent {
  render() {
    const { artist } = this.props;

    const image = artist.images[0];
    const cssClasses = {
      [styles.landscape]: image && image.width > image.height,
      [styles.portrait]: image && image.width < image.height,
      [styles.square]: image && image.width === image.height,
    };

    return (
      <L10NLink to={`/artist/${artist.artist_id}`}>
        {artist.images.length ? <img alt="" className={classNames(cssClasses)} role="presentation" src={image.url} /> : ''}
      </L10NLink>
    );
  }
}
