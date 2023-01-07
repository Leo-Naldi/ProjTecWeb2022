const express = require("express");
const usersRouter = express.Router();
const ObjectId = require("mongodb").ObjectId;



const {
    tecweb_db_create,
    tecweb_db_read,
    tecweb_db_update,
    tecweb_db_delete,
    tecweb_db_get_collection,
    tecweb_db_user_auth,
} = require("../db/db_operations");


/* 
    /users/ uri paths 
*/

usersRouter.get('/', async (req, res) => {

    const users = await tecweb_db_get_collection("users");

    res.send(users);
});

usersRouter.post('/', async (req, res) => {

    const added_id = await tecweb_db_create("users", req.data, { "email": req.data.email });

    if (added_id === null) res.sendStatus(409);  // Email already in use

    res.send({ id: added_id });
});

usersRouter.get('/id/:id', async (req, res) => {

    const result = await tecweb_db_read("users", unique_query = { _id: new ObjectId(req.params.id) });

    res.send(result);
});

usersRouter.get('/email/:email', async (req, res) => {
    res.send(await tecweb_db_read("users", { email: req.params.email }));
});



module.exports = usersRouter;