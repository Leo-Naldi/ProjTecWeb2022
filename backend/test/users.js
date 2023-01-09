require("dotenv").config();
const request = require("supertest");

const app = require("../config/server");

const existing_user = require("../data/test_data").existing_user;
const existing_admin = require("../data/test_data").existing_admin;


describe("/users/ Test Suite", function () {

    describe("GET /users/", function () {
        
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
            request(app).get("/users/")
                .expect(401, done)
        });

        it("Should return status 401 to non-admin users", function (done) {
            request(app).get("/users/")
                .set('Authentication', 'Bearer ' + user_token)
                .expect(401, done)
        });

        it("Should return status 200 and the inserted id to logged admins", function (done) {
            request(app).get("/users/")
                .set('Authorization', 'Bearer ' + admin_token)
                .expect(200)
                .end(done)
        });

        it("Should return an array of users", function (done) {
            const expected_properties = [
                "id",
                "username",
                "email",
                "password",
                "pets",
                "type",
            ];

            request(app).get("/users/")
                .set('Authorization', 'Bearer ' + admin_token)
                .expect(res => {
                    res.body.map(e => {
                        for (let i = 0; i < expected_properties.length; i++) {
                            if (!(expected_properties[i] in e)) {
                                throw new Error(`GET /users/ Missing property:\n${expected_properties[i]}\n from product:\n ${e}\n`);
                            }
                        }
                    })
                }).end(done);
        });
    });

});