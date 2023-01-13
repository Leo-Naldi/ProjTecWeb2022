require("dotenv").config();
const request = require("supertest");
const exec = require("child_process").exec;
var expect = require('chai').expect;

const app = require("../config/server");
const new_product2 = require("../data/test_data").new_product2;
const new_product1 = require("../data/test_data").new_product1;
const existing_user = require("../data/test_data").existing_user;
const existing_admin = require("../data/test_data").existing_admin;

const {
    generate_none_level_ptests,
    generate_user_level_ptests,
    generate_admin_level_ptests
} = require("./priviledges_generator");

const get_keys_test = require("./keys_generator").get_keys_test;
const get_val_test = require("./keys_generator").get_val_test;
const post_keys_test = require("./keys_generator").post_keys_test;
const post_val_test = require("./keys_generator").post_val_test;

describe("/products/ Test Suite", function(){
    describe("GET /products/", function(){
        
        generate_none_level_ptests(() => '/products', 'get', null, "GET /products/")

        get_keys_test(
            () => '/products', 
            () => [
                "id",
                "img",
                "price",
                "name",
                "categories",
                "pet_types",
                "in_store",
            ],
            null,
            "GET /products/")
    });

    describe("POST /products/", function(){

        let admin_token = null;
        // ids are remade at every run so

        before(function (done) {
            request(app).post("/login/admin")
                .send(existing_admin)
                .expect(200)
                .end((err, res) => {
                    admin_token = res.body.token;
                    //console.log(token);
                   done() 
                });
        })

        generate_admin_level_ptests(() => '/products/', 'post', new_product1, "POST /products/");

        post_keys_test(
            () => '/products/',
            [new_product2],
            () => ['id'],
            () => ('Bearer ' + admin_token),
            'POST /products/'
        );

    });

    describe("GET /products/id/:id", function(){

        let params = { id: null, product: null, };
        
        before(function(done){
            request(app).get("/products/")
                .expect(200)
                .end((err, res) => {
                    params.id = res.body[0].id;
                    params.product = res.body[0];
                    if(!(params.id)) 
                        throw new Error("Something went wrong when fetching product id")
                    done();
                })
        })

        generate_none_level_ptests(() => ("/products/id/" + params.id), 'get', null, "GET /products/id/:id")

        get_val_test(
            () => ("/products/id/" + params.id),
            () => [params.product],
            null,
            "GET /products/id/:id"
        )

        describe("Misc Tests", function(){
            it("Should return 409 if the product does not exist", function (done) {
                request(app).get("/products/id/" + "63bc15adc9dc4b773e5126ca")
                    .expect(409)
                    .end(done);
            });

            it("Should return 409 if the given id is not in the correct form", function (done) {
                request(app).get("/products/id/" + "notveryvalidid")
                    .expect(409, done)
            });
        })
    });

    describe("GET /products/category/:category", function(){
        
        generate_none_level_ptests(() => '/products/category/giocattoli', 'get',
            null, "GET /products/category/:category")

        get_keys_test(
            () => '/products',
            () => [
                "id",
                "img",
                "price",
                "name",
                "categories",
                "pet_types",
                "in_store",
            ],
            null,
            "GET /products/"
        );

        describe("Misc Tests", function(){
            it("Should return [] if there are no products of the given category", function (done) {
                request(app).get("/products/category/inshtallah")
                    .expect(200)
                    .expect(res => {
                        if (res.body.length != 0)
                            throw new Error("Body not empty");

                    }).end(done);
            });

            it("Should return an array of products that have the given category in their categories", function (done) {
                request(app).get("/products/category/giocattoli")
                    .expect(200)
                    .expect(res => res.body.map(product => {
                        product.categories.should.be.an('array')
                            .that.is.not.empty;
                        product.categories.should.include.members(['giocattoli']);
                    }))
                    .end(done);
            });
        });
    });
});