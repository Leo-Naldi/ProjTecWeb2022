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

        res.json(users.map(u => ({ ...u, id: u._id.toString() })));
});


// TODO query for admins


module.exports = usersRouter;