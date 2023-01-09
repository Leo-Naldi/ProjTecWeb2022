require("dotenv").config();
const { LEGAL_TCP_SOCKET_OPTIONS } = require("mongodb");
const request = require("supertest");
const exec = require("child_process").exec;

const app = require("../config/server");

// Taken from ../data/users.json, the test assumes it was alreadi put in the db
const existing_user = require("../data/test_data").existing_user;
const existing_admin = require("../data/test_data").existing_admin;
const new_user = require("../data/test_data").new_user;
const new_admin = require("../data/test_data").new_admin;

describe("/register/ Test Suite", function(){

    describe("POST /register/user/", function(){

        it("Should allow to register a user that does not exist", function(done){
            request(app).post("/register/user")
                .send(new_user)
                .expect(200, done);
        });

        it("Should return 409 if the given email already exists", function(done){
            request(app).post("/register/user")
                .send(existing_user)
                .expect(409, done);
        });

    });

    describe("POST /register/admin/", function () {

        let token = null;

        before(function(done){
            request(app).post("/login/admin")
                .send(existing_admin)
                .expect(200)
                .end((err, res) => {
                    token = res.body.token;
                    //console.log(token);
                    done();
                })
        })

        it("Should not allow a non-logged user to create an admin", function(done){
            request(app).post("/register/admin")
                .send({
                    ...new_admin,
                })
                .expect(401, done);
        });

        it("Should not allow a user to create an admin", function(done){

            request(app).post("/login/user")
                .send(existing_user)
                .expect(200)
                .end((err, res) => {
                    request(app).post("/register/admin")
                        .set('Authorization', 'Bearer ' + res.body.token)
                        .send(new_admin)
                        .expect(401, done);

                })

            
        });

        it("Should allow an admin to create an admin", function(done){
            request(app).post("/register/admin")
                .set('Authorization', 'Bearer ' + token)
                .send(new_admin)
                .expect(200, done);
        });

        it ("Should return 409 if an admin tries to create an admin with an already existing email", function(done){
            request(app).post("/register/admin")
                .set('Authorization', 'Bearer ' + token)
                .send(existing_admin)
                .expect(409, done);
        })
    });
})
