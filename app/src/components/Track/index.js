import React, { Component } from 'react';
import Relay from 'react-relay';
import classNames from 'classnames';
import Actions from '../../flux/Actions';
import Store from '../../flux/Store';
import AlbumLink from '../Album/Link';
import styles from './Track.scss';

/* eslint-disable react/prop-types */

class Track extends Component {
  isCurrent() {
    const store = Store.getData();
    if (store.track) {
      return parseInt(store.track, 10) === this.props.track.trackId;
    }
    return false;
  }

  render() {
    const audio = Store.getAudio();
    // eslint-disable-next-line react/prop-types
    const { track, album } = this.props;
    const current = this.isCurrent();
    const className = classNames(styles.item, {
      [styles.paused]: current && (!audio || audio.paused),
      [styles.playing]: current && (audio && !audio.paused),
      [styles.notPlaying]: !current,
    });

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <li
        className={className}
        onClick={() => (this.isCurrent() ? Actions.toggleControl() :
          Actions.setSong({ track, album }))}
      >
        <span className={styles.control}>
          <span className={styles.text}>{track.number}</span>
          <span className={`dashicons dashicons-controls-play ${styles['dashicons-controls-play']}`} />
          <span className={`dashicons dashicons-controls-pause ${styles['dashicons-controls-pause']}`} />
        </span>
        <span className={styles.name}>{track.name}</span>
        <span className={styles.length}>{track.length}</span>
      </li>
    );
  }
}

export default Relay.createContainer(Track, {
  fragments: {
    album: () => Relay.QL`
      fragment on Album {
        albumId
        name
      }
    `,
    track: () => Relay.QL`
      fragment on Track {
        id,
        trackId,
        number,
        name,
        length,
        src,
      }
    `,
  },
});
