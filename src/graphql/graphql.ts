

import { GraphQLObjectType, GraphQLString, GraphQLSchema } from "graphql";

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => `QQuery`
    }
  }
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => `MMutation`
    }
  }
})

export const schema = new GraphQLSchema({ query, mutation })