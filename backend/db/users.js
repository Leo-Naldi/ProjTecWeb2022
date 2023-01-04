const db = require('./client').db;

async function userAdd(data) {

}

async function userModify(data) {

    
}

async function userDelete(data) {

    
}

async function userGet({ id, email }) {

    let query = {};

    if ((id !== null) && (email !== null)) {

        query['$or'] = [{'_id' : id }, {'email': email}];

    } else if (id !== null) {

        query['_id'] = id;

    } else if (email !== null) {

        query['email'] = id;
    
    } else {

        console.error("userGet Called with all null parameters");
    
    }
}