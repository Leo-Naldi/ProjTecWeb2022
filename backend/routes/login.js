const express = require("express");
const router = express.Router();
const passport = require("passport");

const tecweb_db_read = require("../db/db_operations").tecweb_db_read;
const make_token = require("../auth/make_token");


const login = async (req, res, type) => {
    const { email, password } = req.body;

    //console.log(req.body)

    const userWithEmail = await tecweb_db_read("users", { 
        "email": email, 
        type: type 
    }).catch(
        (err) => {
            console.log("Error: ", err);
            res.status(500)
                .json({ message: "Internal Server Error" });
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

    const jwtToken = make_token(
        userWithEmail.id,
        userWithEmail.email,
        type,
    );

    res.json({ message: "Welcome Back!", token: jwtToken });
};

router.post("/user", async (req, res) => login(req, res, "user"));

router.post("/admin", async (req, res) => login(req, res, "admin"));

module.exports = router;