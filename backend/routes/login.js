const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const tecweb_db_read = require("../db/db_operations").tecweb_db_read;

// TODO differentiate between user and admin (in register too)

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    console.log(req.body)

    const userWithEmail = await tecweb_db_read("users", { "email": email }).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );

    if (!userWithEmail)
        return res
            .status(400)
            .json({ message: "Email or password does not match!" });

    if (userWithEmail.password !== password)
        return res
            .status(400)
            .json({ message: "Email or password does not match!" });

    const jwtToken = jwt.sign(
        { id: userWithEmail.id, email: userWithEmail.email },
        process.env.JWT_SECRET
    );

    res.json({ message: "Welcome Back!", token: jwtToken });
});

module.exports = router;


