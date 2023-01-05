require("dotenv").config({ 'path': '../.local.env' });

const fs = require('fs');
const db = require('./client');

async function fillCollection(collection_name, data){
    const collection = db.collection(collection_name);

    await collection.insertMany(data);
}

async function emptyCollection(collection_name) {
    const collection = db.collection(collection_name);

    await collection.deleteMany({});
}

async function fillDB() {

    const user_data = fs.readFileSync('./data/users.json');
    const products_data = fs.readFileSync('./data/products.json');
    const services_data = fs.readFileSync('./data/services.json');

    await fillCollection("users", JSON.parse(user_data));
    await fillCollection("products", JSON.parse(products_data));
    await fillCollection("services", JSON.parse(services_data));


}

async function emptyDB() {

    await emptyCollection("users"); 

    await emptyCollection("products");
    
    await emptyCollection("services");
}

async function remake() {
    //await emptyDB();
    await fillDB();
}

remake()