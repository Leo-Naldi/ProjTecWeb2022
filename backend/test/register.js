require("dotenv").config();
const { LEGAL_TCP_SOCKET_OPTIONS } = require("mongodb");
const request = require("supertest");
const exec = require("child_process").exec;

const app = require("../config/server");

// Taken from ../data/users.json, the test assumes it was alreadi put in the db
const existing_user = {
    "username": "pieralberto",
    "email": "pieralberto.rossi@gmail.com",
    "password": "iloveyou",
};
const existing_admin = {
    "username": "AdamoAmministratori",
    "email": "adamo@admin.sudo",
    "password": "iloveyou7",
};

// These were generated using the previous users
const user_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpIjoicGllcmFsYmVydG8ucm9zc2lAZ21haWwuY29tIiwidHlwZSI6InVzZXIiLCJpYXQiOjE2NzMxOTY5ODB9.XDAGiL2UvcB7gMAaximvmlviObhbhpFa4JyNTO7WHOQ" 
const admin_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpIjoiYWRhbW9AYWRtaW4uc3VkbyIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTY3MzIwMjcyNH0.QASz42T3-gfUgZNw47hE-qEllwbH6I9GPZu3BIL6ErI"

const new_user = {
    "username": "pieraldofrancescani",
    "email": "pieraldo.francescani@gmail.com",
    "password": "333jd",
}

const new_admin = {
    "username": "adamo2",
    "email": "ad_min@gmail.com",
    "password": "3334jd",
}


describe("/register/ Test Suite", function(){

    after(async function () {
        //NB: this only works on linux and if you have mongosh installed
        await exec('mongosh -f ./test/cleanup/register_cleanup.js > /dev/null');
    })

    describe("POST /register/user/", function(){

        it("Should allow to register a user that does not exist", function(done){
            request(app).post("/register/user")
                .send(new_user)
                .expect(200, done);
        });

        it("Should return 409 if the given email already exists", function(done){
            request(app).post("/register/user")
                .send(existing_user)
                .expect(409, done);
        });

    });

    describe("POST /register/admin/", function () {

        let token = null;

        before(function(done){
            request(app).post("/login/admin")
                .send(existing_admin)
                .expect(200)
                .end((err, res) => {
                    token = res.body.token;
                    //console.log(token);
                    done();
                })
        })

        it("Should not allow a non-logged user to create an admin", function(done){
            request(app).post("/register/admin")
                .send({
                    ...new_admin,
                })
                .expect(401, done);
        });

        it("Should not allow a user to create an admin", function(done){
            request(app).post("/register/admin")
                .send({
                    ...new_admin,
                    auth_token: user_token,
                })
                .expect(401, done);
        });

        it("Should allow an admin to create an admin", function(done){
            request(app).post("/register/admin")
                .set('Authorization', 'Bearer ' + token)
                .send(new_admin)
                .expect(200, done);
        });

        it ("Should return 409 if an admin tries to create an admin with an already existing email", function(done){
            request(app).post("/register/admin")
                .set('Authorization', 'Bearer ' + token)
                .send(existing_admin)
                .expect(409, done);
        })
    });
})
