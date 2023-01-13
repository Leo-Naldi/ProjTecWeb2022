require("dotenv").config();
const request = require("supertest");

const app = require("../config/server");

const tecweb_db_read = require("../db/db_operations").tecweb_db_read;

// Taken from ../data/users.json, the test assumes it was alreadi put in the db
const existing_user = require("../data/test_data").existing_user;
const existing_admin = require("../data/test_data").existing_admin;
const new_service1 = require("../data/test_data").new_service1;
const new_service2 = require("../data/test_data").new_service2;

const sizes = require('../db/db_categories').pet_sizes;

const params = require("./hooks");

const {
    generate_none_level_ptests,
    generate_user_level_ptests,
    generate_admin_level_ptests,
    generate_specific_user_level_ptests,
} = require("./priviledges_generator");


describe("/services/ Test Suite", function(){

    describe("GET /services/", function(){

        generate_none_level_ptests(() => "/services/", 'get', null);

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
                    if (res.body.length == 0)
                        throw new Error("GET /services/ Did not return any services");
                 })
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

        generate_admin_level_ptests(
            () => '/services/',
            'post',
            () => ('Bearer ' + params.user_token),
            () => ('Bearer ' + params.admin_token),
            new_service1
        );
    });

    describe("GET /services/id/:id", function () {
        
        // The db gets regenerated every time so you cant just copypaste an id
        let new_p_data = { id: null, } 

        before(function(done){
            tecweb_db_read("users", { email: existing_user.email })
                .then(user => {
                    new_p_data.id = user._id.toString();
                    done()
                })
            
            //console.log(existing_id);
        })

        generate_admin_level_ptests(
            () => ("/services/id/" + new_p_data.id),
            'get',
            () => ('Bearer ' + params.user_token),
            () => ('Bearer ' + params.admin_token),
            null
        );

    });

    /*describe("GET /services/query/", function(){


        const check_field_present = (o, name, error_prefix) => {
            if (!(name in o))
                throw new Error(`${error_prefix} Object: \n${o}\n did not have field ${name}`);
            
        }

        const check_field = (o, name, val, error_prefix) => {
            
            check_field_present(o, name, error_prefix);

            if (o[name] != val)
                throw new Error(`${error_prefix} Object: \n${o}\n had field ${name} set to \n${o[name]}\n instead of \n${val}\n`);
        }

        const check_min_size = (o, val, error_prefix) => {
            check_field_present(o, 'min_size', error_prefix);

            if (o.min_size == null) return;

            if (sizes.indexOf(val) < sizes.indexOf(o['min_size']))
                throw new Error(`${error_prefix} Object: \n${o}\n had min_size \n${o['min_size']}\n`)
        }

        const check_max_size = (o, val, error_prefix) => {
            check_field_present(o, 'max_size', error_prefix);

            if (o.max_size == null) return;

            if (sizes.indexOf(val) > sizes.indexOf(o['max_size']))
                throw new Error(`${error_prefix} Object: \n${o}\n had max_size \n${o['max_size']}\n`)
        }

        const test_queries = [

            {
                query: '',
                validator: (res) => {
                    if (res.body.leng > 0) 
                        throw new Error("GET /services/query/ Non-empty body with empty query");
                },
            },
            {
                query: 'city=Bologna',
                validator: (res) => { 
                    res.body.map(s => 
                        check_field(s, 'city', 'Bologna', "GET /services/query/?city=Bologna"))
                },
            },
            {
                query: 'type=veterinario',
                validator: (res) => {
                    res.body.map(s =>
                        check_field(s, 'type', 'veterinario', "GET /services/query/?type=veterinario"))
                },
            },
            {
                query: 'min_size=subatomico',
                validator: (res) => { 
                    res.body.map(s => {
                        check_min_size(s, 'subatomico', "GET /services/query/?min_size=subatomico")
                    })
                 },
            },
            {
                query: 'max_size=grande',
                validator: (res) => { 
                    res.body.map(s => {
                        check_max_size(s, 'grande', "GET /services/query/?max_size=grande")

                    })
                }
            },
            {
                query: 'city=Bologna&type=veterinario&min_size=subatomico&max_size=grande',
                validator: (res) => { 
                    res.body.map(s => {
                        check_field(s, 'type', 'veterinario', "GET /services/query/?city=Bologna&type=veterinario&min_size=subatomico&max_size=grande")
                        check_field(s, 'city', 'Bologna',"GET /services/query/?city=Bologna&type=veterinario&min_size=subatomico&max_size=grande")
                        check_min_size(s, 'subatomico', "GET /services/query/?city=Bologna&type=veterinario&min_size=subatomico&max_size=grande")
                        check_max_size(s, 'grande', "GET /services/query/?city=Bologna&type=veterinario&min_size=subatomico&max_size=grande")
                    })
                 },
            }
        ];

        generate_none_level_ptests(() => '/services/query/', 'get', null, "GET /services/query/");

        describe('GET /services/query/', function(){
            test_queries.map(test => {
                it('Should return a coherent object', function(done){
                    request(app).get('/services/query/?' + test.query)
                        .expect(test.validator)
                        .end(done);
                })
            })
        })
        
    });*/
})