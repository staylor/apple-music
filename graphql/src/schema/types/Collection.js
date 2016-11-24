import {
  GraphQLObjectType,
  GraphQLList,
} from 'graphql';

import BrowseAlbumType from './BrowseAlbum';

const CollectionType = new GraphQLObjectType({
  name: 'Collection',
  description: 'A list of results.',
  fields: {
    results: {
      type: new GraphQLList(BrowseAlbumType),
      description: 'Currently, a list of albums.',
    },
  },
});

export default CollectionType;
