const jwt = require("jsonwebtoken");

function make_token(id, email, type) {
    return jwt.sign({
        id: id.toHexString(),
        emai: email,
        type: type,
    }, process.env.JWT_SECRET);
}

module.exports = make_token;