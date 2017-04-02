import React, { PureComponent } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import { FormattedMessage } from 'react-intl';
import ArtistLink from 'components/Artist/Link';
import BrowseAlbum from 'components/Album/Browse';
import RelatedArtist from 'components/Artist/Related';
import Track from 'components/Track';
import styles from './Artist.scss';
import catalogStyles from '../Catalog/Catalog.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@withRelay({
  fragments: {
    artist: () => Relay.QL`
      fragment on ArtistInterface {
        name
        ... on Artist {
          images {
            url
          }
        }
        ${ArtistLink.getFragment('artist')}
      }
    `,
    artistAlbums: () => Relay.QL`
      fragment on AlbumCollection {
        results {
          id
          ${BrowseAlbum.getFragment('album')}
        }
      }
    `,
    topTracks: () => Relay.QL`
      fragment on TrackCollection {
        results {
          id
          ${Track.getFragment('track')}
        }
      }
    `,
    relatedArtists: () => Relay.QL`
      fragment on ArtistCollection {
        results {
          id
          ${RelatedArtist.getFragment('artist')}
        }
      }
    `,
  },
})
export default class Artist extends PureComponent {
  render() {
    const {
      artist,
      artistAlbums,
      topTracks,
      relatedArtists,
    } = this.props;

    return (
      <div className={styles.wrap}>
        <h1>{artist.name}</h1>
        {artist.images.length ?
          <img alt="" className={styles.image} role="presentation" src={artist.images[0].url} /> : ''}
        <section>
          <h2>
            <FormattedMessage id="artist.top_songs" />
          </h2>
          <ul className={catalogStyles.tracks}>
            {topTracks.results.map(track => <Track key={track.id} track={track} />)}
          </ul>
        </section>
        <section>
          <h2>
            <FormattedMessage id="artist.albums" />
          </h2>
          <ul className={catalogStyles.albums}>
            {artistAlbums.results.map(album => <BrowseAlbum key={album.id} album={album} />)}
          </ul>
        </section>
        <section>
          <h2>
            <FormattedMessage id="artist.related_artists" />
          </h2>
          <ul className={catalogStyles.artists}>
            {relatedArtists.results.map(relatedArtist => (
              <RelatedArtist key={relatedArtist.id} artist={relatedArtist} />
            ))}
          </ul>
        </section>
      </div>
    );
  }
}
