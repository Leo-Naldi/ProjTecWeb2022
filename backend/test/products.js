require("dotenv").config();
const request = require("supertest");
const exec = require("child_process").exec;

const app = require("../config/server");
const new_product = require("../data/test_data").new_product;
const existing_user = require("../data/test_data").existing_user;
const existing_admin = require("../data/test_data").existing_admin;


describe("/products/ Test Suite", function(){
    describe("GET /products/", function(){
        it("Should return status 200 to non-logged users", function(done){
            request(app).get("/products/")
                .expect(200, done);
        });

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

        let user_token = null, admin_token = null;
        // ids are remade at every run so

        before(function (done) {
            request(app).post("/login/admin")
                .send(existing_admin)
                .expect(200)
                .end((err, res) => {
                    admin_token = res.body.token;
                    //console.log(token);
                    
                });
            request(app).post("/login/user")
                .send(existing_user)
                .expect(200)
                .end((err, res) => {
                    user_token = res.body.token;
                    //console.log(token);
                    done()
                })
        })

        it("Should return status 401 to non-logged users", function(done){
            request(app).post("/products/")
                .send(new_product)
                .expect(401, done)
        });

        it("Should return status 401 to non-admin users", function(done){
            request(app).post("/products/")
                .set('Authentication', 'Bearer ' + user_token)
                .send(new_product)
                .expect(401, done)
        });

        it("Should return status 200 and the inserted id to logged admins", function(done){
            request(app).post("/products/")
                .set('Authorization', 'Bearer ' + admin_token)
                .send(new_product)
                .expect(200)
                .expect(res => {
                    if (!('id' in res.body)) 
                    throw new Error(`POST /products/ id not sent`);
                })
                .end(done)
        });
    });

    describe("GET /products/id/:id", function(){

        let existing_id = null;
        
        before(function(done){
            request(app).get("/products/")
                .expect(200)
                .end((err, res) => {
                    existing_id = res.body[0].id;
                    if(!existing_id) 
                        throw new Error("Something went wrong when fetching product id")
                    done();
                })
        })

        it("Should return status 200 to non-logged users", function (done) {
            request(app).get("/products/id/" + existing_id)
                .expect(200, done);
        });

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

        it("Should return 200 and the correct product if the id matches", function(done){
            request(app).get("/products/id/" + existing_id)
                .expect(200)
                .expect(res => res.body.id == existing_id)
                .end(done);
        });
    });

    describe("GET /products/category/:category", function(){
        it("Should return status 200 to non-logged users", function(done){
            request(app).get("/products/category/giocattoli")
                .expect(200, done);
        });

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