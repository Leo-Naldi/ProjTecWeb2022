require("dotenv").config();
const request = require("supertest");

const app = require("../config/server");

// Taken from ../data/users.json, the test assumes it was alreadi put in the db
const existing_user = require("../data/test_data").existing_user;
const existing_admin = require("../data/test_data").existing_admin;
const new_service = require("../data/test_data").new_service;

describe("/services/ Test Suite", function(){

    describe("GET /services/", function(){

        it("Should send status 200 to non-logged users", function(done){            
            request(app).get("/services/")
                .expect(200, done);     
        });

        it("Should return an array of services", function (done) {
            const expected_properties = [
                "id",
                "name",
                "city",
                "sizes_min",
                "pet_types",
                "sizes_min",
            ];

            request(app).get("/services/")
                .expect(res => {
                    res.body.map(e => {
                        for (let i = 0; i < expected_properties.length; i++) {
                            if (!(expected_properties[i] in e)) {
                                throw new Error(`GET /services/ Missing property:\n${expected_properties[i]}\n from product:\n ${e}\n`);
                            }
                        }
                    })
                }).end(done);
        });
    });

    describe("POST /services/", function(){
        let user_token = null, admin_token = null;
        // ids are remade at every run so

        before(function (done) {
            request(app).post("/login/admin")
                .send(existing_admin)
                .expect(200)
                .end((err, res) => {
                    admin_token = res.body.token;
                    //console.log(token);

                });
            request(app).post("/login/user")
                .send(existing_user)
                .expect(200)
                .end((err, res) => {
                    user_token = res.body.token;
                    //console.log(token);
                    done()
                })
        })

        it("Should return status 401 to non-logged users", function (done) {
            request(app).post("/services/")
                .send(new_service)
                .expect(401, done)
        });

        it("Should return status 401 to non-admin users", function (done) {
            request(app).post("/services/")
                .set('Authentication', 'Bearer ' + user_token)
                .send(new_service)
                .expect(401, done)
        });

        it("Should return status 200 and the inserted id to logged admins", function (done) {
            request(app).post("/services/")
                .set('Authorization', 'Bearer ' + admin_token)
                .send(new_service)
                .expect(200)
                .expect(res => {
                    if (!('id' in res.body))
                        throw new Error(`POST /services/ id not sent`);
                })
                .end(done)
        });
    });

    describe("GET /services/id/:id", function () {

    });
})