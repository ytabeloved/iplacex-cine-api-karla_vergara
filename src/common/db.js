import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGO_URI;

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