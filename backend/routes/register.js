const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const tecweb_db_create = require("../db/db_operations").tecweb_db_create;

router.post("/", async (req, res) => {
    const { username, email, password } = req.body;

    const inserted = await tecweb_db_create("users", {
        username: username,
        email: email,
        password: password,
        pets: [],
        type: "user",
    }, { "email": email }).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );

    if (inserted === null) {
        return res.status(409).json({ message: "User with email already exists!" });
    }

    const jwtToken = jwt.sign(
        { id: inserted.toHexString(), email: email },
        process.env.JWT_SECRET
    );

    res.json({ message: "Thanks for registering", token: jwtToken });
});

module.exports = router;