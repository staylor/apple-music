import React, { PureComponent } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import withRedux from 'decorators/withRedux';
import withIntl from 'decorators/withIntl';
import classNames from 'classnames';
import { toggleCurrentTrack } from 'actions';
import { PLAYER_IDLE, PLAYER_ACTIVE } from 'reducers/player';
import AlbumImage from 'components/Album/Image';
import AlbumLink from 'components/Album/Link';
import ArtistLink from 'components/Artist/Link';
import AlbumTrack from 'components/Track/AlbumTrack';
import styles from './Album.scss';

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */

const mapStateToProps = (state, ownProps) => {
  let currentAlbum = false;
  if (state.currentTrack) {
    currentAlbum = ownProps.album.tracks.items.filter(track => (
      track.track_id === state.currentTrack.track_id
    )).length > 0;
  }
  return {
    current: currentAlbum,
    playerState: state.playerState,
  };
};

const mapDispatchToProps = dispatch => ({
  bindClick: current => () => {
    if (current) {
      dispatch(toggleCurrentTrack());
    }
  },
});

@withRelay({
  fragments: {
    album: () => Relay.QL`
      fragment on AlbumInterface {
        album_id
        name
        artists {
          artist_id
          ${ArtistLink.getFragment('artist')}
        }
        ${AlbumLink.getFragment('album')}
        ${AlbumImage.getFragment('album')}
        ... on Album {
          genres
          copyrights {
            text
          }
          release_date
          tracks {
            items {
              track_id
              duration_ms
              ${AlbumTrack.getFragment('track')}
            }
          }
        }
      }
    `,
  },
})
@withRedux(mapStateToProps, mapDispatchToProps)
@withIntl
export default class Album extends PureComponent {
  static totalTime(items, messages) {
    const totalMs = items.reduce((a, b) => a + b.duration_ms, 0);

    let secs = Math.floor(totalMs / 1000);
    let mins = Math.floor(secs / 60);
    secs %= 60;
    let hours = Math.floor(mins / 60);
    mins %= 60;
    hours %= 24;

    const parts = [];
    if (hours) {
      parts.push(hours > 1 ? `${hours} ${messages.hours}` : `${hours} ${messages.hour}`);
    }
    if (mins) {
      parts.push(mins > 1 ? `${mins} ${messages.minutes}` : `${mins} ${messages.minute}`);
    }
    return parts.join(', ');
  }

  render() {
    const {
      album,
      current,
      intl: {
        locale,
        messages,
        formatNumber,
        formatPlural,
      },
      playerState,
      bindClick,
    } = this.props;

    const playClass = `dashicons dashicons-controls-play ${styles['dashicons-controls-play']}`;
    const pauseClass = `dashicons dashicons-controls-pause ${styles['dashicons-controls-pause']}`;

    const tracks = album.tracks.items.length;

    const className = classNames(styles.album, {
      [styles.paused]: current && playerState === PLAYER_IDLE,
      [styles.playing]: current && playerState === PLAYER_ACTIVE,
      [styles.notplaying]: !current,
    });

    const boundClick = bindClick(current);

    const dateFormatted = (new Date(album.release_date))
      .toLocaleString(locale, {
        month: 'long',
        year: 'numeric',
        day: 'numeric',
      });

    let i = 0;
    const copyKey = () => {
      i += 1;
      return `copyright-${i}`;
    };

    const songPlurals = {
      value: tracks,
      one: messages['album.song'],
      other: messages['album.songs'],
    };

    return (
      <div className={className}>
        <figure className={styles.artwork}>
          <span className={playClass} onClick={boundClick} />
          <span className={pauseClass} onClick={boundClick} />
          <AlbumImage album={album} />
          <figcaption
            className={styles.details}
          >
            {`${formatNumber(tracks)} ${songPlurals[formatPlural(tracks)]}`}
            , {this.constructor.totalTime(album.tracks.items, messages)}
          </figcaption>
        </figure>
        <div className={styles.info}>
          <header>
            <h1><AlbumLink album={album} /></h1>
            <h2>{album.artists.map(artist =>
              <ArtistLink key={artist.artist_id} artist={artist} />)}</h2>
            <div className={styles.meta}>
              {album.genres.length ? `${album.genres[0]} &bull; ` : ''}{dateFormatted}
            </div>
          </header>
          <ol>
            {album.tracks.items.map(item =>
              <AlbumTrack key={item.track_id} track={item} album={album} />)}
          </ol>
          {album.copyrights.map(copyright => (
            <p key={copyKey()}>{copyright.text}</p>
          ))}
        </div>
      </div>
    );
  }
}
