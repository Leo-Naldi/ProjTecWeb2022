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

const make_token = require("../auth/make_token");

const make_user = async (req, res, type) => {

    if (!req.body) {
        return res.sendStatus(409);
    }

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const pets = req.body.pets || [];

    if (!(req.body.username) || !(req.body.email) || !(req.body.password))
        return res.sendStatus(409)

    //console.log(req.body)

    //console.log("returning1")

    const inserted = await tecweb_db_create("users", {
        username: username,
        email: email,
        password: password,
        pets: pets,
        type: type,
    }, { "email": email }).catch(
        (err) => {
            console.log("Error: ", err);
            return res.status(500).json({ message: "Sum server problem ocurred :(" });
        }
    );
    
    //console.log(inserted)

    if (inserted === null) {
        console.log(req.body.email)
        return res.status(409).json({ message: "User with email already exists!" });
    }

    
    const jwtToken = make_token(inserted, email, type);

    return res.json({ message: "Thanks for registering", token: jwtToken, id: inserted.toString() });
};

/* 
    /users/ uri paths 
*/

usersRouter.get('/', passport.authenticate('jwt-admin', { session: false }), 
    async (req, res) => {

        const users = await tecweb_db_get_collection("users");

        res.json(users.map(u => {
            const id = u._id.toString();
            delete u._id;

            return { ...u, id: id, };
        }));
});


usersRouter.post('/user', async (req, res) => make_user(req, res, "user"));

usersRouter.post('/admin', passport.authenticate('jwt-admin', { session: false }), 
    async (req, res) => make_user(req, res, "admin"));

usersRouter.get('/id/:id', passport.authenticate('jwt-user', { session: false }), 
    async (req, res) => {

        if (!(ObjectId.isValid(req.params.id))) return res.sendStatus(409);
        
        if ((req.user.type != 'admin') && (req.user._id.toString() != req.params.id)) 
        {
            return res.sendStatus(401);
        }


        const r = await tecweb_db_read("users", { _id: new ObjectId(req.params.id) })

        if (r === null) {
            return res.sendStatus(409);
        } else {

            delete r._id;

            return res.json([{ ...r, id: req.params.id }]);
        }
});

usersRouter.get('/email/:email', passport.authenticate('jwt-user', { session: false }),
    async (req, res) => {

        if (!(req.params.email)) return res.sendStatus(409)

        if ((req.user.type != 'admin') && (req.user.email != req.params.email))
            return res.sendStatus(401);

        const r = await tecweb_db_read("users", { email: req.params.email })

        if (r === null) {
            return res.sendStatus(409);
        } else {

            const id = r._id.toString();
            delete r._id;

            return res.json([{ ...r, id: id }]);
        }
});

usersRouter.post('/id/:id', passport.authenticate('jwt-user', { session: false }),
    async (req, res) => {

        if (!(ObjectId.isValid(req.params.id))) return res.sendStatus(409);
        
        if ((req.user.type != 'admin') && (req.user._id.toString() != req.params.id))
            return res.sendStatus(401);
        
        
        const fields = ['email', 'password', 'pets', 'username'];

        const update = fields.reduce((q, current) => {
            if (current in req.body) q[current] = req.body[current];
            return q;
        }, {});

        if (Object.keys(update).length > 0) {
            const updated = await tecweb_db_update("users", update, { "_id": new ObjectId(req.params.id) });

            if ((updated.modifiedCount == 0) && (updated.matchedCount > 0)) 
                return res.sendStatus(500);
            else if (((updated.modifiedCount == 0) && (updated.matchedCount == 0))){
                
                return res.sendStatus(409);
            } else 
                return res.json({ ...update, id: req.params.id });

        } else {

            return res.sendStatus(409);
        }
    });

usersRouter.post('/email/:email', passport.authenticate('jwt-user', { session: false }),
    async (req, res) => {

        if ((req.user.type != 'admin') && (req.user.email != req.params.email))
            return res.sendStatus(401);

        const fields = ['email', 'password', 'pets', 'username'];
        const update = fields.reduce((q, current) => {
            if (current in req.body) q[current] = req.body[current];
            return q;
        }, {});

        if (Object.keys(update).length > 0) {
            const updated = await tecweb_db_update("users", update, { email: req.params.email });

            if ((updated.modifiedCount == 0) && (updated.matchedCount > 0))
                return res.sendStatus(500);
            else if (((updated.modifiedCount == 0) && (updated.matchedCount == 0)))
                return res.sendStatus(409);
            else
                return res.json({ ...update, email: req.params.email });

        } else {
            return res.sendStatus(409);
        }
    });

usersRouter.delete('/id/:id', passport.authenticate('jwt-user', { session: false }),
    async (req, res) => {
        
        if (!(ObjectId.isValid(req.params.id))) return res.sendStatus(409);

        if ((req.user.type != 'admin') && (req.user._id.toString() != req.params.id))
            return res.sendStatus(401);

        
        const del_count = await tecweb_db_delete("users", { _id: new ObjectId(req.params.id) });

        if (del_count == 0) 
            return res.sendStatus(500); // If you got here the id was valid
        else 
            return res.json({ count: del_count });
    });

usersRouter.delete('/email/:email', passport.authenticate('jwt-user', { session: false }),
    async (req, res) => {

        if ((req.user.type != 'admin') && (req.user.email != req.params.email))
            return res.sendStatus(401);

        const del_count = await tecweb_db_delete("users", { email: req.params.email });

        if (del_count == 0)
            return res.sendStatus(500); // If you got here the id was valid
        else
            return res.json({ count: del_count });
    });

// TODO deleting you account invalidates the token

module.exports = usersRouter;