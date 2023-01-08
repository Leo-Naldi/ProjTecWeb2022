const express = require("express");
const productsRouter = express.Router();
const ObjectId = require("mongodb").ObjectId;
const passport = require("passport");

const { pet_types, pet_sizes, categories } = require("../db/db_categories");

const {
    tecweb_db_create,
    tecweb_db_read,
    tecweb_db_update,
    tecweb_db_delete,
    tecweb_db_get_collection,
    tecweb_db_user_auth,
} = require("../db/db_operations");

productsRouter.get('/', async (req, res) => {
    res.send(await tecweb_db_get_collection("products"));
})

productsRouter.post('/', passport.authenticate('jwt-admin', { session: false }), 
    async (req, res) => {
        const added_id = await tecweb_db_create("products", req.data);

        if (added_id === null) res.sendStatus(409);

        res.send({ id: added_id });
})


productsRouter.get('/id/:id', async (req, res) => {
    res.send(await tecweb_db_read("products", { "_id": new ObjectId(req.params.id) }));
})

productsRouter.get('/category/:category', async (req, res) => {
    if (categories.indexOf(req.params.category.toLowerCase()) === -1) {
        res.sendStatus(409);
    }

    const result = await tecweb_db_read("products", null, { "categories": { '$all': [req.params.category] } });

    res.send(result);
})

module.exports = productsRouter;