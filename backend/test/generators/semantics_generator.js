require("dotenv").config();
const request = require("supertest");
const path = require("path")

const app = require("../../config/server");


function post_insert_semantics_test(post_url, get_url, admin_auth, bodies) {
    describe("Semantics Tests", function(){
        for (let i = 0; i < bodies.length; i++){
            it("Calling get on the inserted item should return it", async function(){
                
                const res = await request(app).post(post_url())
                    .set('Authorization', admin_auth())
                    .send(bodies[i])

                res.status.should.equal(200);
                res.body.should.be.an('object').that.includes.all.keys(['id']);

                    
                const res2 = await request(app).get(get_url(res.body))
                            .set('Authorization', admin_auth());
                
                res2.status.should.equal(200);
                res2.body[0].should.deep.include(bodies[i])
            })
        }
    })

}

function get_semantics_test(get_collection_url, get_item_url, admin_auth) {
    describe("Semantics Test", function(){
        it("Should return the same array as calling GET /id/:id with every id", async function(){
            const col = await request(app).get(get_collection_url())
                .set("Authorization", admin_auth());

            col.status.should.equal(200);
            col.body.should.be.an('array').that.is.not.empty;

            for (let i = 0; i < col.body.length; i++) {
                const item = await request(app).get(get_item_url(col.body[i]))
                    .set("Authorization", admin_auth());
                
                item.status.should.equal(200);
                item.body.should.be.an('array').that.has.lengthOf(1);
                item.body[0].should.deep.equal(col.body[i])
            }
        });
    });
}

function delete_semantics_test(get_url, delete_url, admin_auth, item) {
    describe("Semantics Test", function(){
        it("Should delete the given item, thus GETting it from /id/:id should return 409", async function(){
            const check = await request(app).get(get_url())
                .set("Authorization", admin_auth());

            check.status.should.equal(200); // make sure the item exists

            const deleted = await request(app).delete(delete_url())
                .set("Authorization", admin_auth());

            deleted.status.should.equal(200);

            const fail = await request(app).get(get_url())
                .set("Authorization", admin_auth());

            fail.status.should.be(409);
        });
    });
}

function get_query_semantics_test() {
    // TODO
}

module.exports = {
    post_insert_semantics_test,
    get_semantics_test,
    delete_semantics_test,
    get_query_semantics_test,
}