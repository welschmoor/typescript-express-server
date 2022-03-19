import { Collection, ObjectId } from "mongodb";

// _id is a mongo thing
export interface Listing {
  _id: ObjectId;
  title: string;
  image: string;
  price: number;
}

export interface Database {
  anzeigen: Collection<Listing>;

}

 