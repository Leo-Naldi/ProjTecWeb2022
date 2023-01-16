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

    res.json((await tecweb_db_get_collection("services")).map(s => {
        const id = s._id.toString();
        delete s._id;

        return { ...s, id: id }
    }));
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
            //console.log(req.params.id)
            return res.sendStatus(409);
        }

        const r = await tecweb_db_read("services", { "_id": new ObjectId(req.params.id) });

        if (r !== null){

            const id = r._id.toString();
            delete r._id;

            return res.json([{ ...r, id: id }]);
        } else {

            return res.sendStatus(409);
        }
})


servicesRouter.post('/id/:id', passport.authenticate('jwt-admin', { session: false }), async (req, res) => {
    
    console.log(req.params.id)

    if (!(ObjectId.isValid(req.params.id))) return res.sendStatus(409);

    const fields = ['name', 'type', 'city', 'pet_types', 'sizes_min', 'sizes_max'];

    const update = fields.reduce((q, current) => {
        if (current in req.body) q[current] = req.body[current];
        return q;
    }, {});

    //console.log(req.body)

    if (Object.keys(update).length > 0) {
        const updated = await tecweb_db_update("services", update, { "_id": new ObjectId(req.params.id) });

        if ((updated.modifiedCount == 0) && (updated.matchedCount > 0))
            return res.sendStatus(500);
        else if (((updated.modifiedCount == 0) && (updated.matchedCount == 0))) {
            console.log("tuamadre")
            return res.sendStatus(409);
        } else
            return res.json({ ...update, id: req.params.id });

    } else {

        return res.sendStatus(409);
    }
});

servicesRouter.delete('/id/:id', passport.authenticate('jwt-admin', { session: false }), async (req, res) => {
    if (!(ObjectId.isValid(req.params.id))) return res.sendStatus(409);


    const del_count = await tecweb_db_delete("services", { _id: new ObjectId(req.params.id) });

    if (del_count == 0)
        return res.sendStatus(409);
    else
        return res.json({ count: del_count });
});


servicesRouter.get('/query/', async (req, res) => {

    let query = new Object();
    let sizes = [];

    console.log(req.query)

    if (cities.indexOf(req.query.city) != -1) query.city = req.query.city;

    console.log(1);

    if (service_types.indexOf(req.query.type) != -1) query.type = req.query.type;

    console.log(2);

    // provider whos min size is equal or lesser than the given one
    if (pet_sizes.indexOf(req.query.min_size) != -1) {
        query.sizes_min = { '$or': pet_sizes.slice(0, pet_sizes.indexOf(req.query.min_size) + 1) + [null] }
    }


    console.log(3);

    // providers whose max size is equal to or greater than the given one
    if (pet_sizes.indexOf(req.query.max_size) != -1) {
        query.sizes_max = { '$or': pet_sizes.slice(pet_sizes.indexOf(req.query.max_size)) + [null]}
    }

    console.log("YOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
    console.log(query);

    if (Object.keys(query).length > 0) {
        res.json(await tecweb_db_read("services", null, query))
    } else {
        res.json([]);
    }
})

module.exports = servicesRouter;