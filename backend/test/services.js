require("dotenv").config();
const request = require("supertest");

const app = require("../config/server");

const test_data = require("../data/test_data");

const sizes = require('../db/db_categories').pet_sizes;

const params = require("./hooks");

const semantic_tests = require("./generators/semantics_generator");

const {
    generate_none_level_ptests,
    generate_user_level_ptests,
    generate_admin_level_ptests,
    generate_specific_user_level_ptests,
} = require("./generators/priviledges_generator");
const { post_keys_test, get_keys_test } = require("./generators/keys_generator");


describe("/services/ Test Suite", function(){

    const new_data = {
        services: [],
    };

    // NB if post /services/ tests fail then this fails
    before(async function () {
        for (let i = 0; i < 6; i++) {
            const service = test_data.make_new_service();

            const inserted = await request(app).post('/services/')
                .set("Authorization", 'Bearer ' + params.admin_token)
                .send(service);

            inserted.status.should.equal(200);
            new_data.services.push({ ...service, id: inserted.body.id })
        }
    })

    describe("GET /services/", function(){

        generate_none_level_ptests(() => "/services/", 'get', null);
        // I test semantici sono in services/id/

        get_keys_test(
            () => '/services/',
            () => ['name', 'type', 'city', 'petTypes', 'sizesMin', 'sizesMax'],
            null,
            '',
        )
    });

    describe("POST /services/", function(){

        generate_admin_level_ptests(
            () => '/services/',
            'post',
            () => ('Bearer ' + params.user_token),
            () => ('Bearer ' + params.admin_token),
            test_data.make_new_service(),
        );

        semantic_tests.post_semantics_test(
            () => '/services/',
            (service) => ('/services/id/' + service.id),
            () => ('Bearer ' + params.admin_token),
            [test_data.make_new_service()]
        );

        post_keys_test(
            () => '/services/',
            [test_data.make_new_service()],
            () => ['id'],
            () => ('Bearer ' + params.admin_token),
            ""
        );

        
    });

    describe("GET /services/id/:id", function () {

        generate_admin_level_ptests(
            () => ("/services/id/" + new_data.services[0].id),
            'get',
            () => ('Bearer ' + params.user_token),
            () => ('Bearer ' + params.admin_token),
            null
        );

        semantic_tests.get_semantics_test(
            () => '/services/',
            (service) => ('/services/id/' + service.id),
            () => ('Bearer ' + params.admin_token),
        );

    });

    describe("POST /services/id/:id", function(){

        generate_admin_level_ptests(
            () => ('/services/id/' + new_data.services[2].id),
            'post',
            () => ('Bearer ' + params.user_token),
            () => ('Bearer ' + params.admin_token),
            { name: "Serviziobello.org" }
        );

        semantic_tests.post_semantics_test(
            () => ('/services/id/' + new_data.services[3].id),
            () => ('/services/id/' + new_data.services[3].id),
            () => ('Bearer ' + params.admin_token),
            [{ name: 'BruniServizi' }, { name: 'AlbertiSErvicizi' }]
        )

    });

    describe("DELETE /services/id/:id", function(){
        generate_admin_level_ptests(
            () => ('/services/id/' + new_data.services[4].id),
            'delete',
            () => ('Bearer ' + params.user_token),
            () => ('Bearer ' + params.admin_token),
            null
        )

        semantic_tests.delete_semantics_test(
            () => ('/services/id/' + new_data.services[5].id),
            () => ('/services/id/' + new_data.services[5].id),
            () => ('Bearer ' + params.admin_token),
        );
    });
})