const express = require("express");
const router = express.Router();
const passport = require("passport");

const tecweb_db_read = require("../db/db_operations").tecweb_db_read;
const make_token = require("../auth/make_token");


const login = async (req, res, type) => {
    const email = req.body.email;
    const password = req.body.password;
    

    const userWithEmail = await tecweb_db_read("users", { 
        "email": email,  
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
            .json({ message: "Incorrect email or password" });
    
    if ((type == "admin") && (userWithEmail.type != "admin"))
        return res
            .status(400)
            .json({ message: "Incorrect email or password" });

    if (userWithEmail.password !== password)
        return res
            .status(400)
            .json({ message: "Incorrect email or password" });

    const jwtToken = make_token(
        userWithEmail._id,
        userWithEmail.email,
        type,
    );

    res.json({ message: "Welcome Back!", token: jwtToken, id: userWithEmail._id.toString() });
};

router.post("/user", async (req, res) => login(req, res, "user"));

router.post("/admin", async (req, res) => login(req, res, "admin"));

module.exports = router;