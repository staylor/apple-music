// @flow

import React from 'react';
import Relay from 'react-relay';
import ArtistLink from './Link';
import BrowseAlbum from '../Album/Browse';
import RelatedArtist from '../Artist/Related';
import Track from '../Track';
import styles from './Artist.scss';
import catalogStyles from '../Catalog/Catalog.scss';

/* eslint-disable react/prop-types */

const Artist = ({
  artist,
  artistAlbums,
  topTracks,
  relatedArtists,
}) => (
  <div className={styles.wrap}>
    <h1>{artist.name}</h1>
    {artist.images.length ?
      <img className={styles.image} role="presentation" src={artist.images[0].url} /> : ''}
    <section>
      <h2>Top Songs</h2>
      <ul className={catalogStyles.tracks}>
        {topTracks.results.map(track => <Track key={track.id} track={track} />)}
      </ul>
    </section>
    <section>
      <h2>Albums</h2>
      <ul className={catalogStyles.albums}>
        {artistAlbums.results.edges.map(({ node }) => <BrowseAlbum key={node.album_id} album={node} />)}
      </ul>
    </section>
    <section>
      <h2>Related Artists</h2>
      <ul className={catalogStyles.artists}>
        {relatedArtists.results.map(relatedArtist => (
          <RelatedArtist key={relatedArtist.id} artist={relatedArtist} />
        ))}
      </ul>
    </section>
  </div>
);

export default Relay.createContainer(Artist, {
  initialVariables: {
    type: 'artistAlbums',
    artistType: 'related',
    trackType: 'topTracks',
  },
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
      fragment on Collection {
        results(type: $type, first: 100) {
          edges {
            node {
              album_id
              ${BrowseAlbum.getFragment('album')}
            }
            cursor
          }
          pageInfo {
            startCursor
            endCursor
          }
        }
      }
    `,
    topTracks: () => Relay.QL`
      fragment on TrackCollection {
        results(trackType: $trackType) {
          id
          ${Track.getFragment('track')}
        }
      }
    `,
    relatedArtists: () => Relay.QL`
      fragment on ArtistCollection {
        results(artistType: $artistType) {
          id
          ${RelatedArtist.getFragment('artist')}
        }
      }
    `,
  },
});
