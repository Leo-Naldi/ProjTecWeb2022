const express = require("express");
const usersRouter = express.Router();
const passport = require("passport");
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

usersRouter.get('/', passport.authenticate('jwt-admin', { session: false }), 
    async (req, res) => {

        const users = await tecweb_db_get_collection("users");

        res.send(users);
});

usersRouter.post('/', async (req, res) => {

    const added_id = await tecweb_db_create("users", req.data, { "email": req.data.email });

    if (added_id === null) res.sendStatus(409);  // Email already in use

    res.send({ id: added_id });
});


usersRouter.get('/id/:id', passport.authenticate('jwt-user', { session: false }), 
    async (req, res) => {

        // TODO if you have a user token then either it's your id (req.user.id methinks)
        // or you get 409.
        const result = await tecweb_db_read("users", unique_query = { _id: new ObjectId(req.params.id) });

        res.send(result);
});

usersRouter.get('/email/:email', passport.authenticate('jwt-user', { session: false }), 
    async (req, res) => {
        // TODO same as /id/:id
        res.send(await tecweb_db_read("users", { email: req.params.email }));
});

// TODO post for single users


module.exports = usersRouter;