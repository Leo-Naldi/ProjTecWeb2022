const passport = require("passport");
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const ObjectID = require("mongodb").ObjectId;

const tecweb_db_read = require("../db/db_operations").tecweb_db_read;

// Token autentication for front-office/game users
passport.use('jwt-user',
    new StrategyJwt(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
            jsonWebTokenOptions: {
                maxAge: "1h",
            }
        },
        function (jwtPayload, done) {

            // Wrong type of token (but admin is fine)
            if ((jwtPayload.type !== "user") && (jwtPayload.type !== "admin")) 
                return done(null, false);

            if (!(ObjectID.isValid(jwtPayload.id))) 
                return done(null, false);

            return tecweb_db_read("users", { "_id": new ObjectID(jwtPayload.id) })
                .then((user) => {
                    if (user)
                        return done(null, user);
                    else
                        return done(null, false);
                })
                .catch((err) => {
                    return done(err);
                });
        }
    )
);

// // Token autentication for front-office/game users
passport.use('jwt-admin',
    new StrategyJwt(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
            jsonWebTokenOptions: {
                maxAge: "1h",
            }
        },
        function (jwtPayload, done) {

            // Wrong type of token
            if (jwtPayload.type !== "admin") {
                
                return done(null, false);
            }

            if (!(ObjectID.isValid(jwtPayload.id))) return done(null, false);            

            return tecweb_db_read("users", { "_id": new ObjectID(jwtPayload.id), type: "admin" })
                .then((user) => {
                    if (user)
                        return done(null, user);
                    else
                        return done(null, false);
                })
                .catch((err) => {
                    return done(err);
                });
        }
    )
);