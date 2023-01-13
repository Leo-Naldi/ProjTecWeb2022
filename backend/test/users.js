require("dotenv").config();
const request = require("supertest");

const app = require("../config/server");
const { generate_admin_level_ptests } = require("./priviledges_generator");

const existing_user = require("../data/test_data").existing_user;
const existing_admin = require("../data/test_data").existing_admin;

const get_keys_test = require("./keys_generator").get_keys_test;
const get_val_test = require("./keys_generator").get_val_test;
const post_keys_test = require("./keys_generator").post_keys_test;
const post_val_test = require("./keys_generator").post_val_test;

describe("/users/ Test Suite", function () {

    describe("GET /users/", function () {
        
        let admin_token = null;

        before(function (done) {
            request(app).post("/login/admin")
                .send(existing_admin)
                .expect(200)
                .end((err, res) => {
                    admin_token = res.body.token;
                    done()
            });
        })

        generate_admin_level_ptests(() => '/users/', 'get', null, "GET /users/")

        get_keys_test(
            () => '/users/',
            () => [
                'id',
                'username',
                'password',
                'email',
                'pets',
                'type',
            ],
            () => ('Bearer ' + admin_token),
            ''
        );
    });

});