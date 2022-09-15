//establish connection
import { MongoClient } from "mongodb";
     
export async function connectToDatabase() {
   const MONGO_URI = `mongodb+srv://aditi:NruNqUTV1OPMxTvN@cluster0.v364j.mongodb.net/authenticationApp?retryWrites=true&w=majority`;
   const client = await MongoClient.connect(MONGO_URI);
   return client;
}