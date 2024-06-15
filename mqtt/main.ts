import { MQTTClient } from 'https://deno.land/x/mqtt/deno/mod.ts'; 
import {
  // ObjectId,
  MongoClient,
} from "https://deno.land/x/mongo@v0.33.0/mod.ts";

const mongoclient = new MongoClient();
// Connecting to a Local Database
await mongoclient.connect("mongodb://mongodb:27017");

// // Connect using srv url
// await mongoclient.connect(
//   "mongodb+srv://<username>:<password>@<db_cluster_url>/<db_name>?authMechanism=SCRAM-SHA-1",
// );

const db = mongoclient.database("sessionstick");
const mqttCollection = db.collection("mqtt");

// Set UP MQTT
const mqttclient = new MQTTClient({ url: 'mqtt.eclipseprojects.io' }); 
await mqttclient.connect();
await mqttclient.subscribe('sessionsticktest/#');

mqttclient.on('message', async (topic: string, payload: string) => {
  console.log( "topic: " + topic, "payload" + payload);

  const insertId = await mqttCollection.insertOne( {
    topic: topic,
    payload: payload
  });
  console.log("insertId", insertId); 

});

//await client.publish('my/topic', 'my payload');
// await client.disconnect();







