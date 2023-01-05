const MongoClient = require("mongodb").MongoClient;

const mongo_uri = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;

const client = new MongoClient(mongo_uri);

module.exports = client;