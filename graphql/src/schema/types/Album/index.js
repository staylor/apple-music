import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {
  globalIdField,
  fromGlobalId,
  nodeDefinitions,
  connectionDefinitions,
} from 'graphql-relay';

import TracksetType from './Trackset';
import CopyrightType from '../Copyright';
import IDMapType from '../IDMap';
import { AlbumLoader } from '../../../database';

import AlbumFields from './AlbumFields';

const AlbumType = new GraphQLObjectType({
  name: 'Album',
  description: 'An album in the catalog',
  fields: () => (Object.assign({}, AlbumFields, {
    id: globalIdField('Album'),
    // eslint-disable-next-line no-use-before-define
    node: nodeField,
    copyrights: {
      type: new GraphQLList(CopyrightType),
      description: 'List of copyrights.',
    },
    external_ids: {
      type: IDMapType,
      description: 'List of external IDs.',
    },
    genres: {
      type: new GraphQLList(GraphQLString),
      description: 'The genres for the album.',
    },
    popularity: {
      type: GraphQLInt,
      description: 'The popularity ranking of the album.',
    },
    release_date: {
      type: GraphQLString,
      description: 'The date the album was released.',
    },
    release_date_precision: {
      type: GraphQLString,
      description: 'The precision of the release date.',
    },
    tracks: {
      type: TracksetType,
      description: 'The album track info.',
    },
  })),
  // eslint-disable-next-line no-use-before-define
  interfaces: [nodeInterface],
});

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { id } = fromGlobalId(globalId);
    return AlbumLoader.load(id);
  },
  () => AlbumType
);

const defs = connectionDefinitions({ nodeType: AlbumType });

export const AlbumEdge = defs.edgeType;
export const AlbumConnection = defs.connectionType;

export default AlbumType;
