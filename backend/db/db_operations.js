const client = require('../config/client');

const db = client.db(process.env.MONGO_DBNAME);
const user_projection = { 
    "password": 0,
};


/* Inserts new document in the collection. Unique query is an obj used
   to check wether the document values are allowed, e.g. 
   unique_query=  { "email": giovanni@gmail.com } to check wether a new user's email
   is already in use.
   Returns null if the insertion fail, the inserted document's id otherwise */
async function tecweb_db_create(collection, document, unique_query=null) {
    const c = db.collection(collection);

    if (unique_query) {
        const already = await c.findOne(unique_query);

        if (already) return null;
    }

    const res = await c.insertOne(document);

    return res.insertedId;
}

async function tecweb_db_read(collection, unique_query=null, generic_query=null, search_text="") {

    const c = db.collection(collection);

    if (unique_query) { 
        const res = await c.findOne(unique_query);
        return res;
    }

    const index =  await c.find(generic_query);

    return await index.toArray();
}

async function tecweb_db_update(collection, new_values, search_query) {

    const res = await db.collection(collection)
        .updateOne(search_query, { '$set': new_values });

    return res;
}

async function tecweb_db_delete(collection, search_query) {
    return await (await db.collection(collection).deleteOne(search_query)).deletedCount;
}

async function tecweb_db_get_collection(collection) {
    const col = db.collection(collection);
    
    const index = await col.find().project({
        "password": 0,  // works even if the documents have no passoword field I THINK
    });

    return index.toArray();
}

// 10 out of 10 most secure thing you'll ever see
async function tecweb_db_user_auth(email, password, cb) {
    const col = db.collection("users");
    const res = await col.findOne({ "email": email, "password": password })
        .project(user_projection);

    return res;
}

module.exports = {
    tecweb_db_create,
    tecweb_db_read,
    tecweb_db_update,
    tecweb_db_delete,
    tecweb_db_get_collection,
    tecweb_db_user_auth,
    db,
}