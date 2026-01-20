const { MongoClient, ServerApiVersion } = require('mongodb');

// Use MONGODB_URL (matching your .env file)
const uri = process.env.MONGODB_URL;
const dbName = process.env.DB_NAME;

// Add validation
if (!uri) {
  throw new Error('MONGODB_URL environment variable is not defined');
}

if (!dbName) {
  throw new Error('DB_NAME environment variable is not defined');
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export const dbConnect = (name) => {
  return client.db(dbName).collection(name);
}