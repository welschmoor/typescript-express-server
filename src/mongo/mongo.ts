import dotenv from "dotenv"
dotenv.config()

import { Database } from "../types/types";

import { MongoClient } from "mongodb";

const MONGO_URI = 'mongodb+srv://hunni:hurensohn@cluster0.ivs3r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

export const connectMongo = async (): Promise<Database> => {
  const client = await MongoClient.connect(MONGO_URI)

  const DB = client.db('DB')

  return {   
    listings: DB.collection('test')
  }
}

