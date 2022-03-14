

import { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLFloat, GraphQLNonNull } from "graphql";

const Listing = new GraphQLObjectType({
  name: "Listing",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    price: { type: GraphQLFloat },

  }
})

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