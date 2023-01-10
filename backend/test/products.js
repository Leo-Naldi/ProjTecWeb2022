require("dotenv").config();
const request = require("supertest");
const exec = require("child_process").exec;

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

describe("/products/ Test Suite", function(){
    describe("GET /products/", function(){
        
        generate_none_level_ptests(() => '/products', 'get', null, "GET /products/")

        it("Should return an array of products", function(done){
            const expected_properties = [
                "id",
                "img",
                "price",
                "categories",
                "pet_types",
                "in_store",
            ];

            request(app).get("/products/")
                .expect(res => {
                    res.body.map(e => {
                        for (let i = 0; i < expected_properties.length; i++) {
                            if (!(expected_properties[i] in e)) {
                                throw new Error(`GET /products/ Missing property:\n${expected_properties[i]}\n from product:\n ${e}\n`);
                            }
                        }
                    })
                }).end(done);
        });
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

        it("Should return the new id when insertion is successfull", function(done){
            request(app).post("/products/")
                .set('Authorization', 'Bearer ' + admin_token)
                .send(new_product2)
                .expect(200)
                .expect(res => {
                    if (!('id' in res.body)) 
                    throw new Error(`POST /products/ id not sent`);
                })
                .end(done)
        });
    });

    describe("GET /products/id/:id", function(){

        let params = { id: null };
        
        before(function(done){
            request(app).get("/products/")
                .expect(200)
                .end((err, res) => {
                    params.id = res.body[0].id;
                    if(!(params.id)) 
                        throw new Error("Something went wrong when fetching product id")
                    done();
                })
        })

        generate_none_level_ptests(() => ("/products/id/" + params.id), 'get', null, "GET /products/id/:id")

        it("Should return null if the product does not exist", function(done){
            request(app).get("/products/id/" + "63bc15adc9dc4b773e5126ca")
                .expect(200)
                .expect(res => {
                    if (Object.keys(res.body).length != 0) 
                        throw new Error(`Body not empty on non existant product id: ${JSON.stringify(res.body)}`)
                })
                .end(done);
        });

        it("Should return 409 if the given id is not in the correct form", function(done){
            request(app).get("/products/id/" + "notveryvalidid")
                .expect(409, done)
        });

        it("Should the correct product", function(done){
            request(app).get("/products/id/" + params.id)
                .expect(200)
                .expect(res => res.body.id == params.id)
                .end(done);
        });
    });

    describe("GET /products/category/:category", function(){
        
        generate_none_level_ptests(() => '/products/category/giocattoli', 'get',
            null, "GET /products/category/:category")

        it("Should return [] if there are no products of the given category", function(done){
            request(app).get("/products/category/inshtallah")
                .expect(200)
                .expect(res => {
                    if (res.body.length != 0)
                        throw new Error("Body not empty");
                    
                }).end(done);
        });

        it("Should return an array of products that have the given category in their categories", function(done){
            request(app).get("/products/category/giocattoli")
                .expect(200)
                .expect(res => res.body.map(product => {
                    if (product.categories.indexOf('giocattoli') == -1)
                        throw new Error("Category not present")
                }))
                .end(done);
        });
    });
});