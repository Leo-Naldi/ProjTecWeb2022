require("dotenv").config({ 'path': '../.local.env' });

const fs = require('fs');
const { connectDB, disconnectDB, db } = require('./client');


async function fillCollection(db, collection_name, data){
    const collection = db.collection(collection_name);

    await collection.insertMany(data);
}

async function emptyCollection(db, collection_name) {
    const collection = db.collection(collection_name);

    await collection.deleteMany({});
}

async function fillDB() {
    const db = await connectDB();

    const user_data = fs.readFileSync('./data/users.json');
    const products_data = fs.readFileSync('./data/products.json');
    const services_data = fs.readFileSync('./data/services.json');

    await fillCollection(db, "users", JSON.parse(user_data));
    await fillCollection(db, "products", JSON.parse(products_data));
    await fillCollection(db, "services", JSON.parse(services_data));

    await disconnectDB()
}

async function emptyDB() {
    const db = await connectDB();

    await emptyCollection(db, "users");
    await emptyCollection(db, "products");

    await disconnectDB();
}

async function remake() {
    //await emptyDB();
    await fillDB();
}


remake()