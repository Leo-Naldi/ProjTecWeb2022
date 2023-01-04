const MongoClient = require("mongodb").MongoClient;

const mongo_uri = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
const client = new MongoClient(mongo_uri);
const db_name = process.env.MONGO_DBNAME;

let db;


async function connectDB() {
    await client.connect();

    db = client.db(db_name);

    return db;
}

async function disconnectDB() {
    client.close()
}

module.exports = { connectDB, disconnectDB, db }