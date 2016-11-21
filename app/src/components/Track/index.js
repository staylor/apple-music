import React from 'react';
import Relay from 'react-relay';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { toggleCurrentTrack, setCurrentTrack } from '../../actions';
import styles from './Track.scss';

/* eslint-disable react/prop-types */

let Track = ({ track, current, onClick }) => {
  const audio = null;
  const className = classNames(styles.item, {
    [styles.paused]: current && (!audio || audio.paused),
    [styles.playing]: current && (audio && !audio.paused),
    [styles.notPlaying]: !current,
  });

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <li
      className={className}
      onClick={onClick}
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
};

const mapStateToProps = (state, ownProps) => ({
  current: state.currentTrack && state.currentTrack.trackId === ownProps.track.trackId,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(ownProps.current ? toggleCurrentTrack() : setCurrentTrack(ownProps.track));
  },
});

Track = connect(
  mapStateToProps,
  mapDispatchToProps
)(Track);

export default Relay.createContainer(Track, {
  fragments: {
    track: () => Relay.QL`
      fragment on Track {
        id
        trackId
        number
        name
        length
        src
        album(first: 1) {
          edges {
            node {
              albumId
              name
              image
              artist(first: 1) {
                edges {
                  node {
                    artistId
                    name
                  }
                }
              }
            }
          }
        }
      }
    `,
  },
});
