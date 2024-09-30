import { MongoClient } from "mongodb";

export async function GET(request: Request) {
  // Replace the uri string with your MongoDB deployment's connection string.

  console.log(process.env.MONGODB_URL)
  const url = process.env.MONGODB_URL;

  if (!url) {
    throw new Error('Please add your MONGODB_URL to .env.local')
  }

  const client = new MongoClient(url);

  const database = client.db("testdb");
  const mqtt_messages = database.collection("mqtt_messages");
  const query = {};

  const options = {
    //projection: { _id: },
  };

  // Execute query
  const cursor = mqtt_messages.find({});
  const ret = await cursor.toArray()

  return Response.json(ret);
  
}
