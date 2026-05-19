import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb://developer:hotCnuDhxWAypnCE@ac-mgu30td-shard-00-00.ifewi73.mongodb.net:27017,ac-mgu30td-shard-00-01.ifewi73.mongodb.net:27017,ac-mgu30td-shard-00-02.ifewi73.mongodb.net:27017/cine-db?ssl=true&replicaSet=atlas-btniy4-shard-0&authSource=admin&retryWrites=true&w=majority&appName=cluster-express";

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function connectDB() {
  try {

    await client.connect();

    await client.db("admin").command({ ping: 1 });

    console.log("Conexión exitosa a MongoDB Atlas");

    return true;

  } catch (error) {

    console.error("Error al conectar a MongoDB Atlas:", error);

    return false;

  }
}