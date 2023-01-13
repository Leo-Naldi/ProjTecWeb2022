require("dotenv").config();
const client = require("../config/client");
const request = require("supertest");

const app = require("../config/server");

const {
    existing_user,
    existing_admin,
    new_user,
    new_admin,
    new_product1,
    new_product2,
    new_service1,
    new_service2,
} = require("../data/test_data");


after(async function(){
    await client.close();
})

let params = {};

    before(function(done){
        request(app).post("/login/admin")
            .send(existing_admin)
            .expect(200)
            .end((err, res) => {
                params.admin_token = res.body.token;

                request(app).post("/login/user")
                    .send(existing_user)
                    .expect(200)
                    .end((err, res) => {
                        params.user_token = res.body.token;
                        done()
                    })

            });
})


module.exports = params;