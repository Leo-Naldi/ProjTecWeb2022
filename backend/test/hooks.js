require("dotenv").config();
const client = require("../config/client");
const request = require("supertest");

const app = require("../config/server");

const test_data = require("../data/test_data");


after(async function(){
    await client.close();
})

let params = {};

    before(function(done){
        request(app).post("/login/admin")
            .send(test_data.existing_admin)
            .expect(200)
            .end((err, res) => {

                if (err) throw err;

                params.admin_token = res.body.token;
                params.admin_id = res.body.id;

                request(app).post("/login/user")
                    .send(test_data.existing_user)
                    .expect(200)
                    .end((err, res) => {

                        if (err) throw err;

                        params.user_token = res.body.token;
                        params.user_id = res.body.id;
                        
                        request(app).post("/login/user")
                            .send(test_data.existing_user2)
                            .expect(200)
                            .end((err, res) => {

                                if (err) throw err;

                                params.user2_token = res.body.token;
                                params.user2_id = res.body.id;
                                done()
                            })
                    })

            });
})


module.exports = params;