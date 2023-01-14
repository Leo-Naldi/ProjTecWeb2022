require("dotenv").config();
const request = require("supertest");

const app = require("../config/server");
const { generate_admin_level_ptests, generate_none_level_ptests } = require("./generators/priviledges_generator");

const existing_user = require("../data/test_data").existing_user;
const new_user = require("../data/test_data").new_user;
const new_user2 = require("../data/test_data").new_user2;
const new_user3 = require("../data/test_data").new_user3;
const existing_admin = require("../data/test_data").existing_admin;
const new_admin = require("../data/test_data").new_admin;
const new_admin2 = require("../data/test_data").new_admin2;
const new_admin3 = require("../data/test_data").new_admin3;

const test_data = require("../data/test_data");

const get_keys_test = require("./generators/keys_generator").get_keys_test;
const get_val_test = require("./generators/keys_generator").get_val_test;
const post_keys_test = require("./generators/keys_generator").post_keys_test;
const post_val_test = require("./generators/keys_generator").post_val_test;

const semantic_tests = require("./generators/semantics_generator");

const params = require("./hooks");

describe("/users/ Test Suite", function () {

    describe("GET /users/", function () {
        

        generate_admin_level_ptests(
            () => '/users/',
            'get',
            () => ('Bearer ' + params.user_token),
            () => ('Bearer ' + params.admin_token),
            null
        );

        get_keys_test(
            () => '/users/',
            () => [
                'id',
                'username',
                'password',
                'email',
                'type',
            ],
            () => ('Bearer ' + params.admin_token),
            ''
        );
    });

    describe("POST /users/user", function(){

        generate_none_level_ptests(
            () => '/users/user',
            'post',
            test_data.make_new_user(),
        );

        semantic_tests.post_insert_semantics_test(
            () => '/users/user',
            (user) => ('/users/id/' + user.id),
            () => ('Bearer ' + params.admin_token),
            [test_data.make_new_user()]
        );

        post_keys_test(
            () => '/users/user',
            [test_data.make_new_user()],
            () => ['id', 'token'],
            () => ('Bearer ' + params.admin_token),
            ""
        );

    });

    describe.skip("POST /users/admin");

    describe.skip("GET /users/id/:id");

    describe.skip("GET /users/email/:email");

    describe.skip("POST /users/id/:id");

    describe.skip("POST /users/email/:email");

    describe.skip("DELETE /users/id/:id");

    describe.skip("DELETE /users/email/:email");
});