const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

async function listDatabases() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const databasesList = await client.db().admin().listDatabases();
    
    console.log("Available databases:");
    databasesList.databases.forEach(db => {
      console.log(` - ${db.name}`);
    });
    
  } finally {
    await client.close();
  }
}

listDatabases().catch(console.error);