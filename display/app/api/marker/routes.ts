import { MongoClient } from "mongodb";

export async function GET(request: Request) {
  // Replace the uri string with your MongoDB deployment's connection string.

  const url = process.env.MONGODB_URL || " ";

  const client = new MongoClient(url);

  const database = client.db("test");
  const mqtt_messages = database.collection("mqtt_messages");
  const query = {  };

  const options = {
    //projection: { _id: 0, title: 1, imdb: 1 },
  };
  // Execute query
  const cursor = mqtt_messages.find(query, options);
  // Print a message if no documents were found
  if ((await mqtt_messages.countDocuments(query)) === 0) {
    console.log("No documents found!");
  }

  const ret = cursor.toArray()

  return Response.json({ret});
}
