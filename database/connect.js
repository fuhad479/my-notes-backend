import dotenv from 'dotenv';
import { MongoClient } from "mongodb";

dotenv.config();

export const client = new MongoClient(process.env.CONNECTION_STRING)

async function connect() {
  try {
    await client.connect()

    console.log('connected with database');
  } catch (error) {
    console.log(error);
  }
}

export default connect;
