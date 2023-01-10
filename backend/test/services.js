require("dotenv").config();
const request = require("supertest");

const app = require("../config/server");

const tecweb_db_read = require("../db/db_operations").tecweb_db_read;

// Taken from ../data/users.json, the test assumes it was alreadi put in the db
const existing_user = require("../data/test_data").existing_user;
const existing_admin = require("../data/test_data").existing_admin;
const new_service1 = require("../data/test_data").new_service1;
const new_service2 = require("../data/test_data").new_service2;

const {
    generate_none_level_ptests,
    generate_user_level_ptests,
    generate_admin_level_ptests
} = require("./priviledges_generator");

describe("/services/ Test Suite", function(){

    describe("GET /services/", function(){

        /*it("Should send status 200 to non-logged users", function(done){            
            request(app).get("/services/")
                .expect(200, done);     
        });*/

        generate_none_level_ptests(() => "/services/", 'get', null, "GET /services/");

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

        generate_admin_level_ptests(() => "/services/", 'post', new_service1, "POST /services/");
    });

    describe("GET /services/id/:id", function () {
        
        // The db gets regenerated every time so you cant just copypaste an id
        let params = { id: null } 

        before(function(done){
            tecweb_db_read("users", { email: existing_user.email })
                .then(user => {
                    params.id = user._id.toString();
                    done();
                })
            
            //console.log(existing_id);
        })

        generate_admin_level_ptests(() => ("/services/id/" + params.id), 'get', null,
            "GET /services/id/:id");

    });
})