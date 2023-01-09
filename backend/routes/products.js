const e = require("express");
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
    res.json((await tecweb_db_get_collection("products")).map(e => ({
        id: e._id.toString(),
        img: e.img,
        price: e.price,
        categories: e.categories,
        pet_types: e.pet_types,
        in_store: e.in_store,
    })));
})

productsRouter.post('/', passport.authenticate('jwt-admin', { session: false }), 
    async (req, res) => {
        //console.log(req.body)
        const added_id = await tecweb_db_create("products", req.body);
        //console.log(added_id)

        if (added_id === null) res.sendStatus(409);

        res.json({ id: added_id.toString() });
})


productsRouter.get('/id/:id', async (req, res) => {
    
    if (!(ObjectId.isValid(req.params.id))) {
    
        res.sendStatus(409);
    } else {
        const id = new ObjectId(req.params.id)

        const p = await tecweb_db_read("products", { "_id": id });

        if (p === null) res.sendStatus(200)
        else res.json(p);
    }
});


productsRouter.get('/category/:category', async (req, res) => {

    const result = await tecweb_db_read("products", null, { "categories": { '$all': [req.params.category] } });

    res.json(result);
})

module.exports = productsRouter;