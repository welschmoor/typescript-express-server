// this files fills the database with data
import dotenv from "dotenv"
dotenv.config()

import { ObjectId } from "mongodb"
import { connectMongo } from "../src/mongo/mongo"
import { Listing } from "../src/types/types"

const mockDB: Listing[] = [
  { _id: new ObjectId(), title: "Bike", price: 120, image: "url" },
  { _id: new ObjectId(), title: "Job", price: 1000, image: "url" },
  { _id: new ObjectId(), title: "Cat", price: 100, image: "url" },
  { _id: new ObjectId(), title: "Dog", price: 200, image: "url" },
]

const seed = async () => {
  try {
    const DB = await connectMongo()
    console.log("DB", DB)
    for (const each of mockDB) {
      await DB.anzeigen.insertOne(each)
    }
    console.log("DB populated with mock Data!")
  }
  catch (error) {
    console.log(error)
    throw new Error("failed to populate the database")
  }
}

seed()