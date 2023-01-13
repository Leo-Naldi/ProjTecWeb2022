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
                'pets',
                'type',
            ],
            () => ('Bearer ' + params.admin_token),
            ''
        );
    });

});