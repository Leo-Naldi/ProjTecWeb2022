require("dotenv").config();
const request = require("supertest");
const should = require("chai").should();

const app = require("../config/server");
const { generate_admin_level_ptests, generate_none_level_ptests, generate_specific_user_level_ptests } = require("./generators/priviledges_generator");

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

        semantic_tests.post_semantics_test(
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

    describe("POST /users/admin", function(){
        generate_admin_level_ptests(
            () => '/users/admin',
            'post',
            () => ('Bearer ' + params.user_token),
            () => ('Bearer ' + params.admin_token),
            test_data.make_new_admin()
        );

        semantic_tests.post_semantics_test(
            () => '/users/admin',
            (user) => ('/users/id/' + user.id),
            () => ('Bearer ' + params.admin_token),
            [test_data.make_new_admin()]
        );

        post_keys_test(
            () => '/users/admin',
            [test_data.make_new_admin()],
            () => ['id', 'token'],
            () => ('Bearer ' + params.admin_token),
            ""
        );
    });

    describe("GET /users/id/:id", function() {

        generate_specific_user_level_ptests(
            () => ('/users/id/' + params.user_id),
            () => ('Bearer ' + params.user_token),
            () => ('Bearer ' + params.user2_token),
            () => ('Bearer ' + params.admin_token),
            'get',
            null
        );

        semantic_tests.get_semantics_test(
            () => '/users/',
            (user) => ('/users/id/' + user.id),
            () => ('Bearer ' + params.admin_token),
        )

        describe("Misc Tests", function(){
            it("Should return status 409 if the id is not valid", async function(){
                const res = await request(app).get('/users/id/valididiswear')
                    .set("Authorization", 'Bearer ' + params.admin_token);

                res.status.should.equal(409);
            })
        });

    });

    describe("GET /users/email/:email", function(){
        generate_specific_user_level_ptests(
            () => ('/users/email/' + test_data.existing_user.email),
            () => ('Bearer ' + params.user_token),
            () => ('Bearer ' + params.user2_token),
            () => ('Bearer ' + params.admin_token),
            'get',
            null
        );

        semantic_tests.get_semantics_test(
            () => '/users/',
            (user) => ('/users/email/' + user.email),
            () => ('Bearer ' + params.admin_token),
        )

        describe.skip("Misc Tests", function () {
            it("Should return status 409 if the id is not valid", async function () {
                const res = await request(app).get('/users/email/')
                    .set("Authorization", 'Bearer ' + params.admin_token);

                res.status.should.equal(409);
            })
        });
    });

    describe("POST /users/id/:id", function(){

        let new_data = { user1: null, token1: null, 
            user2: null, token2: null, };

        before(async function(){
            const user = test_data.make_new_user();
            const res = await request(app).post('/users/user/')
                .send(user);
            
            res.status.should.equal(200);
            new_data.user1 = user;
            new_data.user1.id = res.body.id
            new_data.token1 = res.body.token;

            const user2 = test_data.make_new_user();
            const res2 = await request(app).post('/users/user/')
                .send(user2);

            res2.status.should.equal(200);
            new_data.user2 = user2;
            new_data.user2.id = res2.body.id;
            new_data.token2 = res2.body.token;
        });

        generate_specific_user_level_ptests(
            () => ('/users/id/' + new_data.user1.id),
            () => ('Bearer ' + new_data.token1),
            () => ('Bearer ' + new_data.token2),
            () => ('Bearer ' + params.admin_token),
            'post',
            [{ username: "albano" }, { username: "pieraldo" }]
        );
        
        semantic_tests.post_semantics_test(
            () => ('/users/id/' + new_data.user2.id),
            () => ('/users/id/' + new_data.user2.id),
            () => ('Bearer ' + params.admin_token),
            [{ username: "albertolo" }]
        )

        describe("Misc Tests", function(){

            it("Sould return status 409 if the id is not valid", async function(){
                const r = await request(app).post("/users/id/validissim9oid")
                    .set("Authorization", 'Bearer ' + params.admin_token)
                
                    r.status.should.equal(409);
            })
        });

    });

    describe("POST /users/email/:email", function(){
        let new_data = {
            user1: null, token1: null,
            user2: null, token2: null,
        };

        before(async function () {
            const user = test_data.make_new_user();
            const res = await request(app).post('/users/user/')
                .send(user);

            res.status.should.equal(200);
            new_data.user1 = user;
            new_data.user1.id = res.body.id
            new_data.token1 = res.body.token;

            const user2 = test_data.make_new_user();
            const res2 = await request(app).post('/users/user/')
                .send(user2);

            res2.status.should.equal(200);
            new_data.user2 = user2;
            new_data.user2.id = res2.body.id;
            new_data.token2 = res2.body.token;
        });

        generate_specific_user_level_ptests(
            () => ('/users/email/' + new_data.user1.email),
            () => ('Bearer ' + new_data.token1),
            () => ('Bearer ' + new_data.token2),
            () => ('Bearer ' + params.admin_token),
            'post',
            [{ username: "albano" }, { username: "pieraldo" }]
        );

        semantic_tests.post_semantics_test(
            () => ('/users/email/' + new_data.user2.email),
            () => ('/users/email/' + new_data.user2.email),
            () => ('Bearer ' + params.admin_token),
            [{ "username": "albertolo" }]
        )

        describe.skip("Misc Tests", function () {

            it("Sould return status 409 if the email is not valid", async function () {
                const r = await request(app).post("/users/id/validissim9oid")
                    .set("Authorization", 'Bearer ' + params.admin_token)

                r.status.should.equal(409);
            })
        });
    });

    // TODO deleting an account should invalidate the token
    describe("DELETE /users/id/:id", function(){
        let new_data = {
            user1: null, token1: null,
            user2: null, token2: null,
        };

        before(async function () {
            const user = test_data.make_new_user();
            const res = await request(app).post('/users/user/')
                .send(user);

            res.status.should.equal(200);
            new_data.user1 = user;
            new_data.user1.id = res.body.id
            new_data.token1 = res.body.token;

            const user2 = test_data.make_new_user();
            const res2 = await request(app).post('/users/user/')
                .send(user2);

            res2.status.should.equal(200);
            new_data.user2 = user2;
            new_data.user2.id = res2.body.id;
            new_data.token2 = res2.body.token;
        });

        generate_specific_user_level_ptests(
            () => ('/users/id/' + new_data.user1.id),
            () => ('Bearer ' + new_data.token1),
            () => ('Bearer ' + new_data.token2),
            () => ('Bearer ' + params.admin_token),
            'delete',
            null
        )

        semantic_tests.delete_semantics_test(
            () => ('/users/id/' + new_data.user2.id),
            () => ('/users/id/' + new_data.user2.id),
            () => ('Bearer ' + params.admin_token),
        );
    });

    describe("DELETE /users/email/:email", function(){
        let new_data = {
            user1: null, token1: null,
            user2: null, token2: null,
        };

        before(async function () {
            const user = test_data.make_new_user();
            const res = await request(app).post('/users/user/')
                .send(user);

            res.status.should.equal(200);
            new_data.user1 = user;
            new_data.user1.id = res.body.id
            new_data.token1 = res.body.token;

            const user2 = test_data.make_new_user();
            const res2 = await request(app).post('/users/user/')
                .send(user2);

            res2.status.should.equal(200);
            new_data.user2 = user2;
            new_data.user2.id = res2.body.id;
            new_data.token2 = res2.body.token;
        });

        generate_specific_user_level_ptests(
            () => ('/users/email/' + new_data.user1.email),
            () => ('Bearer ' + new_data.token1),
            () => ('Bearer ' + new_data.token2),
            () => ('Bearer ' + params.admin_token),
            'delete',
            null
        )

        semantic_tests.delete_semantics_test(
            () => ('/users/email/' + new_data.user2.email),
            () => ('/users/email/' + new_data.user2.email),
            () => ('Bearer ' + params.admin_token),
        );
    });
});