import dotenv from "dotenv"
dotenv.config()

import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginDrainHttpServer } from "apollo-server-core"
import { makeExecutableSchema } from '@graphql-tools/schema'

import { SubscriptionServer } from 'subscriptions-transport-ws'
import { subscribe, execute } from 'graphql'

import { ApolloServer } from "apollo-server-express"
import express from "express"
import http from "http"

import { typeDefs, resolvers } from './graphql/schema'
import { connectMongo } from "./mongo/mongo"

const PORT = process.env.PORT

const createServer = async () => {
  const DB = await connectMongo()
  const app = express()
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({ settings: { "schema.polling.enable": false } }),
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            }
          };
        }
      }
    ],
    context: () => {
      return { DB }
    }
  })


  await server.start()
  server.applyMiddleware({ app, path: '/graphql' })

  const subscriptionServer = SubscriptionServer.create(
    {
      schema, execute, subscribe,
      // onConnect: async ({ token }) => {
      //   if (!token) {
      //     throw new Error("401 unauthorized, can't listen to sub")
      //   }
      //   console.log(token)
      //   const currentUser = await getUser(token)
      //   console.log("|||||", currentUser)
      //   return { currentUser: currentUser }
      // },
    },
    { server: httpServer, path: server.graphqlPath },
  );


  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
    );
    console.log(
      `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
    );
  });

  const listings = await DB.listings.find({}).toArray()
  console.log(listings)
}

createServer()
