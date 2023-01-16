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
    res.json((await tecweb_db_get_collection("products")).map(e => {
        const id = e._id.toString();
        delete e._id;
        return { ...e, id: id, }
    }));
})

productsRouter.post('/', passport.authenticate('jwt-admin', { session: false }), 
    async (req, res) => {
        //console.log(req.body)

        if (Object.keys(req.body).length == 0) return res.sendStatus(409)

        const added_id = await tecweb_db_create("products", req.body);
        
        if (added_id === null) return res.sendStatus(409);
        //console.log(added_id)

        return res.status(200).json({ id: added_id.toString() });
})


productsRouter.get('/id/:id', async (req, res) => {
    
    //console.log(req.params.id)

    if (!(ObjectId.isValid(req.params.id))) {
    
        res.sendStatus(409);
    } else {
        const id = new ObjectId(req.params.id)

        const p = await tecweb_db_read("products", { "_id": id });

        if (p === null) res.sendStatus(409)
        else {
            delete p._id;
            res.json([{ ...p, id: id.toString(), }])
        }
    }
});


productsRouter.get('/category/:category', async (req, res) => {

    const result = await tecweb_db_read("products", null, { "categories": { '$all': [req.params.category] } });

    res.json(result);
})

productsRouter.post('/id/:id', passport.authenticate('jwt-admin', { session: false }), async (req, res) => {
    
    if (!(ObjectId.isValid(req.params.id))) return res.sendStatus(409);


    /* 
    "img": "https://source.unsplash.com/random",
        "name": "Osso giocattolo placcato in oro",
        "price": 900,
        "categories": [
            "giocattoli",
            "accessori"
        ],
        "pet_types": [
            "cane"
        ],
        "in_store": 100,
     */

    const fields = ['img', 'name', 'price', 'categories', 'pet_types', 'in_store'];

    const update = fields.reduce((q, current) => {
        if (current in req.body) q[current] = req.body[current];
        return q;
    }, {});

    if (Object.keys(update).length > 0) {
        const updated = await tecweb_db_update("products", update, { "_id": new ObjectId(req.params.id) });

        if ((updated.modifiedCount == 0) && (updated.matchedCount > 0))
            return res.sendStatus(500);
        else if (((updated.modifiedCount == 0) && (updated.matchedCount == 0))) {

            return res.sendStatus(409);
        } else
            return res.json({ ...update, id: req.params.id });

    } else {

        return res.sendStatus(409);
    }
});

productsRouter.delete('/id/:id', passport.authenticate('jwt-admin', { session: false }), async (req, res) => {
    if (!(ObjectId.isValid(req.params.id))) return res.sendStatus(409);

    const del_count = await tecweb_db_delete("products", { _id: new ObjectId(req.params.id) });

    if (del_count == 0)
        return res.sendStatus(500); // If you got here the id was valid
    else
        return res.json({ count: del_count });
});

module.exports = productsRouter;