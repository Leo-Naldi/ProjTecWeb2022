const express = require("express");
const passport = require("passport");
const { pet_types, pet_sizes, categories } = require("../db/db_categories");
const servicesRouter = express.Router();
const ObjectId = require("mongodb").ObjectId;

const {
    tecweb_db_create,
    tecweb_db_read,
    tecweb_db_update,
    tecweb_db_delete,
    tecweb_db_get_collection,
    tecweb_db_user_auth,
} = require("../db/db_operations");

servicesRouter.get('/', async (req, res) => {

    //console.log("Getall called");

    res.send(await tecweb_db_get_collection("services"));
})


servicesRouter.post('/', passport.authenticate('jwt-admin', { session: false }), 
    async (req, res) => {
        const added_id = await tecweb_db_create("services", req.data);

        if (added_id === null) res.sendStatus(409);  // Email already in use

        res.send({ id: added_id });
})

servicesRouter.get('/id/:id', passport.authenticate('jwt-admin', { session: false }), 
    async (req, res) => {
        res.send(await tecweb_db_read("services", { "_id": new ObjectId(req.params.id) }));
})

// TODO post /id/:id
// TODO post /

servicesRouter.get(':type?&:city?&:min_size?&:max_size?', async (req, res) => {

    console.log(req.params)


    if (Object.values(req.params).every(v => v === undefined)) 
        res.send(await tecweb_db_get_collection("services"));
    else {
        res.send(await tecweb_db_read("services", null, req.params));
    }

    //const result = await tecweb_db_read("services", null, { "service_type": req.params.type });

    //res.send(result);
})

module.exports = servicesRouter;