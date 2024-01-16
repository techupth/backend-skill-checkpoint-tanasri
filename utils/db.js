//Todo: Setup database connection here
import { MongoClient } from "mongodb";

const connectionString = "mongodb://127.0.0.1:27017";
const dbName = "practice-mongo";

export const client = new MongoClient(connectionString);
export const db = client.db(dbName);
