const express = require("express");
const passport = require("passport");
const { pet_types, pet_sizes, categories, cities, service_types } = require("../db/db_categories");
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

    res.json((await tecweb_db_get_collection("services")).map(s => ({ ...s, id: s._id.toString() })));
})


servicesRouter.post('/', passport.authenticate('jwt-admin', { session: false }), 
    async (req, res) => {
        const added_id = await tecweb_db_create("services", req.body);

        if (added_id === null) return res.sendStatus(409);  // Email already in use

        res.json({ id: added_id.toString() });
})

servicesRouter.get('/id/:id', passport.authenticate('jwt-admin', { session: false }), 
    async (req, res) => {

        if (!(ObjectId.isValid(req.params.id))) {
            console.log(req.params.id)
            return res.sendStatus(409);
        }

        const r = await tecweb_db_read("services", { "_id": new ObjectId(req.params.id) });

        if (r !== null)
            res.json({ ...r, id: r._id.toString() });
        else 
            res.json({});
})



servicesRouter.get('/query/', async (req, res) => {

    let query = {};
    let sizes = [];

    if (cities.indexOf(req.query.city) != -1) query.city = req.query.city;

    if (service_types.indexOf(req.query.type) != -1) query.type = req.query.type;

    if (pet_sizes.indexOf(req.query.min_size) != -1) {
        query.sizes_min = { '$or': pet_sizes.slice(pet_sizes.indexOf(req.query.min_size)) }
    }

    if (pet_sizes.indexOf(req.query.max_size) != -1) {
        query.sizes_max = { '$or': pet_sizes.slice(0, pet_sizes.indexOf(req.query.max_size)) }
    }

    if (Object.keys(query).length > 0) {
        res.json(await tecweb_db_read("services", null, query))
    } else {
        res.json([]);
    }
})

module.exports = servicesRouter;