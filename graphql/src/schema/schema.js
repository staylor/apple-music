import { GraphQLSchema } from 'graphql';
import Root from './types/Root';

const Schema = new GraphQLSchema({
  query: Root,
});

export default Schema;
