import dotenv from "dotenv"
dotenv.config()

import { MongoClient } from "mongodb";

const MONGO_URI = 'mongodb+srv://hunni:<password>@cluster0.ivs3r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

export const connectMongo = async () => {
  const client = await MongoClient.connect(MONGO_URI)

  const DB = client.db('DB')

  return {
    listings: DB.collection('test')
  }
}

