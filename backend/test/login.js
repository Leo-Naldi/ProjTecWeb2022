require("dotenv").config();
const request = require("supertest");

const app = require("../config/server");

// Taken from ../data/users.json, the test assumes it was alreadi put in the db
const existing_user = {
    "username": "pieralberto",
    "email": "pieralberto.rossi@gmail.com",
    "password": "iloveyou",
};
const existing_admin = {
    "username": "AdamoAmministratori",
    "email": "adamo@admin.sudo",
    "password": "iloveyou7",
};

describe("/login/ Test Suite", function(){

    describe("POST /login/user", function(){

        it("Should return status 200 with an existing user", function(done){
            request(app).post("/login/user")
            .send(existing_user)
            .expect(200, done);
        });

        it("Should send a token when given an existing user", function(done){
            request(app).post("/login/user")
                .send(existing_user)
                .expect(res => {
                    if (!('token' in res.body)) throw new Error("Missing Token")
                }).end(done);
        })

        it("Should reject a user that does not exist", function(done){
            request(app).post("/login/user")
                .send({
                    username: "jbkijbnkj",
                    email: "hjbuivuib",
                    password: "cbifdcbeifbveivn"
                }).expect(400, done);
        });

        it("Should accept an admin account", function (done) {
            request(app).post("/login/user")
                .send(existing_admin)
                .expect(200, done);
        });

    });

    describe("POST /login/admin", function () {

        it("Should accept an admin account that exists", function(done){
            request(app).post("/login/admin")
                .send(existing_admin)
                .expect(200, done);
        });

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