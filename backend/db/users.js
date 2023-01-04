const db = require('./client').db;

async function userAdd(data) {
    const users = db.collection("users");

    await users.insertOne(data);
}

async function userModify(data) {
    const users = db.collection("users");
    // TODO   
}

async function userDelete(data) {
    const users = db.collection("users");
    
}


async function usersGetAll() {
    const users = db.collection("users");
    return await users.find();
}

async function userQuery({ id, email }) {
    const users = db.collection("users");
    let query = {};

    if ((id !== null) && (email !== null)) {

        query['$or'] = [{'_id' : id }, {'email': email}];

    } else if (id !== null) {

        query['_id'] = id;

    } else if (email !== null) {

        query['email'] = id;
    
    } else {
        console.error("userGet Called with all null parameters");
        return null;
    }

    return await users.find(query);
}

module.exports = {
    userAdd,
    userModify,
    userDelete,
    userQuery,
    usersGetAll,
}