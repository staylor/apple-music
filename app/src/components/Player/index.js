import React from 'react';
import Relay from 'react-relay';
import { FormattedMessage } from 'react-intl';
import Actions from '../../flux/Actions';
import Store from '../../flux/Store';
import AlbumLink from '../Album/Link';
import ArtistLink from '../Artist/Link';
import styles from './Player.scss';

/* eslint-disable jsx-a11y/no-static-element-interactions */

function Player(props) {
  const audio = Store.getAudio();
  // eslint-disable-next-line react/prop-types
  const { album, track } = props;
  let artist = null;
  let dashicon = 'play';
  const cssStyles = {
    width: '0%',
  };
  let details;

  if (album) {
    album.artist.edges.map(({ node }) => (artist = node));
  }

  if (track && track.name) {
    if (audio && audio.duration && audio.currentTime) {
      cssStyles.width = `${Math.floor((100 / audio.duration) * audio.currentTime)}%`;
      dashicon = audio.paused ? 'play' : 'pause';
    }
    details = (
      <div className={styles.details}>
        &#8220;{track.name}&#8221; <span><FormattedMessage id="player.from" /></span>
        &nbsp;<em><AlbumLink album={album} /></em>
        &nbsp;<span><FormattedMessage id="player.by" /></span>
        &nbsp;<ArtistLink artist={artist} />
      </div>
    );
  } else {
    details = <div className={styles.details}><FormattedMessage id="player.nothing" /></div>;
  }

  return (
    <div className={styles.wrap}>
      <div
        onClick={Actions.toggleControl}
        className={`${styles.control} dashicons dashicons-controls-${dashicon}`}
      />
      <div className={styles.metadata}>
        {details}
        <div className={styles.track}>
          <div className={styles.progress} style={cssStyles} />
        </div>
      </div>
    </div>
  );
}

Player.defaultProps = {
  album: null,
  track: null,
};

export default Relay.createContainer(Player, {
  fragments: {
    album: () => Relay.QL`
      fragment on Album {
        ${AlbumLink.getFragment('album')}
        artist(first: 1) {
          edges {
            node {
              ${ArtistLink.getFragment('artist')}
            }
          }
        }
      }
    `,
    track: () => Relay.QL`
      fragment on Track {
        name
      }
    `,
  },
});
