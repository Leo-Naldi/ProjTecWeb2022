const express = require("express");
const passport = require("passport");
const router = express.Router();

const tecweb_db_create = require("../db/db_operations").tecweb_db_create;
const make_token = require("../auth/make_token");


const make_user = async (req, res, type) => {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const pets = req.body.pets || [];

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

    if (inserted === null) {
        return res.status(409).json({ message: "User with email already exists!" });
    }

    const jwtToken = make_token(inserted, email, type);

    res.json({ message: "Thanks for registering", token: jwtToken });
};

router.post("/user", async (req, res) => make_user(req, res, "user"));

// Only an admin can create another admin
router.post("/admin", passport.authenticate('jwt-admin', { session: false }), 
    async (req, res) => make_user(req, res, "admin"));

module.exports = router;