require("dotenv").config();
const request = require("supertest");

const app = require("../config/server");

// Taken from ../data/users.json, the test assumes it was alreadi put in the db
const existing_user = require("../data/test_data").existing_user;
const existing_admin = require("../data/test_data").existing_admin;

const {
    generate_none_level_ptests,
    generate_user_level_ptests,
    generate_admin_level_ptests,
    generate_specific_user_level_ptests
} = require("./generators/priviledges_generator");

describe("/login/ Test Suite", function(){

    describe("POST /login/user", function(){

        generate_none_level_ptests(() => "/login/user", 'post', existing_user)

        it("Should send a token when given an existing user", function(done){
            request(app).post("/login/user")
                .send(existing_user)
                .expect(res => {
                    if (!('token' in res.body)) throw new Error("Missing Token")
                }).end(done);
        })

        it("Should return status 400 when given a user that does not exist", function(done){
            request(app).post("/login/user")
                .send({
                    username: "jbkijbnkj",
                    email: "hjbuivuib",
                    password: "cbifdcbeifbveivn"
                }).expect(400, done);
        });

        it("Should log in an admin account", function (done) {
            request(app).post("/login/user")
                .send(existing_admin)
                .expect(200, done);
        });

    });

    describe("POST /login/admin", function () {

        generate_none_level_ptests(() => "/login/admin", 'post', existing_admin)

        it("Should send a token when given an existing admin", function(done){
            request(app).post("/login/admin")
                .send(existing_admin)
                .expect(res => {
                    if (!('token' in res.body)) throw new Error("Missing Token")
                }).end(done);
        });

        it("Should reject an admin that does not exist", function (done) {
            request(app).post("/login/admin")
                .send({
                    username: "jbkijbnkj",
                    email: "hjbuivuib",
                    password: "cbifdcbeifbveivn",
                    type: "admin",
                }).expect(400, done);
        });

        it("Should reject a user account", function(done){
            request(app).post("/login/admin")
                .send(existing_user).expect(400, done);
        });
    });
});