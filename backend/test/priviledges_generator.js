require("dotenv").config();
const request = require("supertest");

const app = require("../config/server");
const existing_user = require("../data/test_data").existing_user;
const existing_admin = require("../data/test_data").existing_admin;

function generate_none_level_ptests(endpoint_generator, method, body) {
    if (method == 'get') {

        describe("Privilege Tests", function () {

            it("Should return status 200 to non-logged users", function (done) {
                request(app).get(endpoint_generator()).expect(200, done);
            })

        });

    } else if (method == 'post') {
        describe("Privilege Tests", function () {

            it("Should return status 200 to non-logged users", function (done) {
                request(app).post(endpoint_generator())
                    .send(body)
                    .expect(200, done);
            })

        });
    }
}

function generate_user_level_ptests(endpoint_generator, method, user_auth, admin_auth, bodies) {
    if (method == 'get') {

        describe("Privilege Tests", function () { 

            it("Should return status 401 to non-logged users", function (done) {
                request(app).get(endpoint_generator()).expect(401, done);
            });

            it("Should return status 200 to logged users", function(done) {
                request(app).get(endpoint_generator())
                    .set('Authorization', user_auth())
                    .expect(200, done);
            })

            it("Should return status 200 to admins", function (done) {
                request(app).get(endpoint_generator())
                    .set('Authorization', admin_auth())
                    .expect(200, done);
            })

        });

    } else if (method == 'post') {
        describe("Privilege Tests", function () {

            it("Should return status 401 to non-logged users", function (done) {
                request(app).post(endpoint_generator())
                    .send(bodies[0])
                    .expect(401, done);
            });

            it("Should return status 200 to logged users", function (done) {
                request(app).post(endpoint_generator())
                    .set('Authorization', user_auth())
                    .send(bodies[0])
                    .expect(200, done);
            })

            it("Should return status 200 to logged admins", function (done) {
                request(app).post(endpoint_generator())
                    .set('Authorization', admin_auth())
                    .send(bodies[1])
                    .expect(200, done);
            })

        });
    }
}

function generate_admin_level_ptests(endpoint_generator, method, user_auth, admin_auth, body) {
    if (method == 'get') {

        describe("Privilege Tests", function () {
            
            it("Should return status 401 to non-logged users", function (done) {
                request(app).get(endpoint_generator()).expect(401, done);
            });
            
            it("Should return status 401 to logged users", function (done) {
                request(app).get(endpoint_generator())
                .set('Authorization', user_auth())
                .expect(401, done);
            })
            
            it("Should return status 200 to logged admins", function (done) {
                request(app).get(endpoint_generator())
                .set('Authorization', admin_auth())
                .expect(200, done);
            })
        });

    } else if (method == 'post') {
        describe("Privilege Tests", function () {

            it("Should return status 401 to non-logged users", function (done) {
                request(app).post(endpoint_generator())
                    .send(body)
                    .expect(401, done);
            });

            it("Should return status 401 to logged users", function (done) {
                request(app).post(endpoint_generator())
                    .set('Authorization', user_auth())
                    .send(body)
                    .expect(401, done);
            })

            it("Should return status 200 to logged admins", function (done) {
                request(app).post(endpoint_generator())
                    .set('Authorization', admin_auth())
                    .send(body)
                    .expect(200, done);
            })

        });
    }
}

function generate_specific_user_level_ptests(endpoint_generator, valid_auth, invalid_auth, admin_auth, method, bodies) {

    if (method == 'get') {

        describe("Privilege Tests", function () {

            it("Should return status 401 to non-logged users", function (done) {
                request(app).get(endpoint_generator()).expect(401, done);
            });

            it("Should return status 401 to logged users", function (done) {
                request(app).get(endpoint_generator())
                    .set("Authorization", invalid_auth())
                    .expect(401, done);
            })

            it("Should return status 200 to one specific user", function (done) {
                request(app).get(endpoint_generator())
                    .set('Authorization', valid_auth())
                    .expect(200, done);
            })

            it("Should return status 200 to admins", function (done) {
                request(app).get(endpoint_generator())
                    .set('Authorization', admin_auth())
                    .expect(200, done);
            })

        });

    } else if (method == 'post') {
        describe("Privilege Tests", function () {

            it("Should return status 401 to non-logged users", function (done) {
                request(app).post(endpoint_generator())
                    .send(body[0])
                    .expect(401, done);
            });

            it("Should return status 401 to logged users", function (done) {
                request(app).post(endpoint_generator())
                    .set('Authorization', invalid_auth())
                    .send(body[0])
                    .expect(401, done);
            })

            it("Should return status 200 to one specific user", function (done) {
                request(app).post(endpoint_generator())
                    .set('Authorization', valid_auth())
                    .send(body[0])
                    .expect(200, done);
            })

            it("Should return status 200 to one specific user", function (done) {
                request(app).post(endpoint_generator())
                    .set('Authorization', admin_auth())
                    .send(body[1])
                    .expect(200, done);
            })

        });
    }

}

module.exports = { 
    generate_none_level_ptests, 
    generate_user_level_ptests, 
    generate_admin_level_ptests,
    generate_specific_user_level_ptests
}