

import { gql } from "apollo-server-express"

export const typeDefs = gql`
  type Listing {
    id: ID!
    title: String!
    image: String!
    price: Int!
  }

  type Query {
    listings: [Listing!]!
    _dummy: String
  }
  
  type Mutation{
    deleteListing(id: ID!): Listing
  }

`