require("dotenv").config();
const request = require("supertest");

const app = require("../config/server");
const existing_user = require("../data/test_data").existing_user;
const existing_admin = require("../data/test_data").existing_admin;

function generate_none_level_ptests(endpoint_generator, method, body, describe_string_prefix) {
    if (method == 'get') {

        describe(describe_string_prefix + " Privilege Tests", function () {

            it("Should return status 200 to non-logged users", function (done) {
                request(app).get(endpoint_generator()).expect(200, done);
            })

        });

    } else if (method == 'post') {
        describe(describe_string_prefix + " Privilege Tests", function () {

            it("Should return status 200 to non-logged users", function (done) {
                request(app).post(endpoint_generator())
                    .send(body)
                    .expect(200, done);
            })

        });
    }
}

function generate_user_level_ptests(endpoint_generator, method, body, describe_string_prefix) {
    if (method == 'get') {

        describe(describe_string_prefix + " Privilege Tests", function () {

            let user_token = null;

            before(function (done) {
                request(app).post("/login/user")
                    .send(existing_user)
                    .expect(200)
                    .end((err, res) => {
                        user_token = res.body.token;
                        done();
                    });

            });  

            it("Should return status 401 to non-logged users", function (done) {
                request(app).get(endpoint_generator()).expect(401, done);
            });

            it("Should return status 200 to logged users", function(done) {
                request(app).get(endpoint_generator())
                    .set('Authorization', 'Bearer ' + user_token)
                    .expect(200, done);
            })

        });

    } else if (method == 'post') {
        describe(describe_string_prefix + " Privilege Tests", function () {

            let user_token = null;

            before(function (done) {
                request(app).post("/login/user")
                    .send(existing_user)
                    .expect(200)
                    .end((err, res) => {
                        user_token = res.body.token;
                        done();
                    });

            });

            it("Should return status 401 to non-logged users", function (done) {
                request(app).post(endpoint_generator())
                    .send(body)
                    .expect(401, done);
            });

            it("Should return status 200 to logged users", function (done) {
                request(app).post(endpoint_generator())
                    .set('Authorization', 'Bearer ' + user_token)
                    .send(body)
                    .expect(200, done);
            })

        });
    }
}

function generate_admin_level_ptests(endpoint_generator, method, body, describe_string_prefix) {
    if (method == 'get') {

        describe(describe_string_prefix + " Privilege Tests", function () {

            let user_token = null, admin_token = null;

            before(function (done) {
            request(app).post("/login/admin")
                .send(existing_admin)
                .expect(200)
                .end((err, res) => {
                    admin_token = res.body.token;
                    //console.log(token);

                    request(app).post("/login/user")
                        .send(existing_user)
                        .expect(200)
                        .end((err, res) => {
                            user_token = res.body.token;
                            //console.log(token);
                            done()
                        })
                });
            
        })

            it("Should return status 401 to non-logged users", function (done) {
                request(app).get(endpoint_generator()).expect(401, done);
            });

            it("Should return status 401 to logged users", function (done) {
                request(app).get(endpoint_generator())
                    .set('Authorization', 'Bearer ' + user_token)
                    .expect(401, done);
            })

            it("Should return status 200 to logged admins", function (done) {
                request(app).get(endpoint_generator())
                    .set('Authorization', 'Bearer ' + admin_token)
                    .expect(200, done);
            })

        });

    } else if (method == 'post') {
        describe(describe_string_prefix + " Privilege Tests", function () {

            let user_token = null, admin_token = null;

            before(function (done) {
            request(app).post("/login/admin")
                .send(existing_admin)
                .expect(200)
                .end((err, res) => {
                    admin_token = res.body.token;
                    //console.log(token);

                    request(app).post("/login/user")
                        .send(existing_user)
                        .expect(200)
                        .end((err, res) => {
                            user_token = res.body.token;
                            //console.log(token);
                            done()
                        })
                });
            
        })

            it("Should return status 401 to non-logged users", function (done) {
                request(app).post(endpoint_generator())
                    .send(body)
                    .expect(401, done);
            });

            it("Should return status 401 to logged users", function (done) {
                request(app).post(endpoint_generator())
                    .set('Authorization', 'Bearer ' + user_token)
                    .send(body)
                    .expect(401, done);
            })

            it("Should return status 200 to logged users", function (done) {
                request(app).post(endpoint_generator())
                    .set('Authorization', 'Bearer ' + admin_token)
                    .send(body)
                    .expect(200, done);
            })

        });
    }
}

module.exports = { 
    generate_none_level_ptests, 
    generate_user_level_ptests, 
    generate_admin_level_ptests 
}