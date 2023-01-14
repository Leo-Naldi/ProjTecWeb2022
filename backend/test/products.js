require("dotenv").config();
const request = require("supertest");

const app = require("../config/server");

const {
    generate_none_level_ptests,
    generate_user_level_ptests,
    generate_admin_level_ptests,
    generate_specific_user_level_ptests
} = require("./generators/priviledges_generator");

const get_keys_test = require("./generators/keys_generator").get_keys_test;
const get_val_test = require("./generators/keys_generator").get_val_test;
const post_keys_test = require("./generators/keys_generator").post_keys_test;
const post_val_test = require("./generators/keys_generator").post_val_test;

const semantic_tests = require("./generators/semantics_generator");

const params = require("./hooks");

const test_data = require("../data/test_data");

describe("/products/ Test Suite", function(){
    describe("GET /products/", function(){
        
        generate_none_level_ptests(() => '/products', 'get', null)

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


        generate_admin_level_ptests(
            () => '/products/', 
            'post',
            () => ('Bearer ' + params.user_token),
            () => ('Bearer ' + params.admin_token),
            test_data.make_new_product()
        );

        post_keys_test(
            () => '/products/',
            [test_data.make_new_product()],
            () => ['id'],
            () => ('Bearer ' + params.admin_token),
            'POST /products/'
        );

        semantic_tests.post_semantics_test(
            () => '/products/',
            (prod) => ('/products/id/' + prod.id),
            () => ('Bearer ' + params.admin_token),
            [test_data.make_new_product()]
        )

    });

    describe("GET /products/id/:id", function(){

        let new_prod_data = { id: null, product: null, };
        
        before(function(done){
            request(app).get("/products/")
                .expect(200)
                .end((err, res) => {
                    new_prod_data.id = res.body[0].id;
                    new_prod_data.product = res.body[0];
                    if(!(new_prod_data.id)) 
                        throw new Error("Something went wrong when fetching product id")
                    done();
                })
        })

        generate_none_level_ptests(() => ("/products/id/" + new_prod_data.id), 'get', null)

        get_val_test(
            () => ("/products/id/" + new_prod_data.id),
            () => [new_prod_data.product],
            null,
            "GET /products/id/:id"
        )

        semantic_tests.get_semantics_test(
            () => '/products/',
            (product) => ('/products/id/' + product.id),
            () =>('Bearer ' + params.admin_token)
        );

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
            null)

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
                    .expect(res => {
                        res.body.should.be.an('array').that.is.not.empty;
                        res.body.map(product => {
                        product.categories.should.be.an('array').that.includes.members(['giocattoli']);
                    })})
                    .end(done);
            });
        });
    });
});