require("dotenv").config();
const should = require("chai").should();
const request = require("supertest");

const app = require("../config/server");
const existing_user = require("../data/test_data").existing_user;
const existing_admin = require("../data/test_data").existing_admin;


function test_res_keys(res, expected_keys) {

    res.body.should.be.an('array').that.is.not.empty;
    res.body.map(v => { v.should.be.an('object').that.has.all.keys(expected_keys); })

}

function test_res_values(res, expected_values) {

    res.body.should.be.an('array').that.is.not.empty;
    res.body.should.have.deep.members(expected_values);

}

function test_res_object_values(res, expected_val) {

    res.body.should.be.an('object').that.is.deep.equal(expected_val);

}

function test_res_object_keys(res, expected_keys) {

    res.body.should.be.an('object').that.has.all.keys(expected_keys);

}


function get_test(endpoint_generator, test_values_generator, auth_generator, describe_string, test) {
    describe(describe_string, function () {

        it("Should return an array of appropriate objects", function (done) {
            if(auth_generator === null){

                request(app).get(endpoint_generator())
                .expect(res => {
                    test(res, test_values_generator());
                }).end(done);
            } else {
                request(app).get(endpoint_generator())
                    .set('Authorization', auth_generator())
                    .expect(res => {
                        test(res, test_values_generator());
                    }).end(done);
            }
        })

    });
}

function post_test(endpoint_generator, test_bodies, test_values_generator, auth_generator, describe_string, test) {
    
    if (test_bodies.length === 0) throw new Error("Passed empty body to post_test")

    describe(describe_string, function () {

        const values = test_bodies;

        for (let i = 0; i < values.length; i++) {

            it("Should return an array of appropriate objects with test value number " + i, function (done) {
                if (auth_generator === null) {
                    request(app).post(endpoint_generator())
                    .send(values[i])
                    .expect(res => {
                        test(res, test_values_generator());
                    }).end(done);
                } else {
                    request(app).post(endpoint_generator())
                        .set('Authorization', auth_generator())
                        .send(values[i])
                        .expect(res => {
                            test(res, test_values_generator());
                        }).end(done);
                }
            })

        }
    });
}


function get_keys_test(endpoint_generator, expected_keys_generator, auth_generator, describe_string_prefix) {
    get_test(
        endpoint_generator,
        expected_keys_generator,
        auth_generator,
        "Key Tests",
        test_res_keys
    );
}

function get_val_test(endpoint_generator, expected_vals_generator, auth_generator, describe_string_prefix) {
    get_test(
        endpoint_generator,
        expected_vals_generator,
        auth_generator,
        "Value Tests",
        test_res_values
    );
}

function post_keys_test(endpoint_generator, test_bodies, expected_keys_generator, auth_generator, describe_string_prefix) {
    post_test(
        endpoint_generator,
        test_bodies,
        expected_keys_generator,
        auth_generator,
        "Key Tests",
        test_res_object_keys
    )
}

function post_val_test(endpoint_generator, test_bodies, expected_vals_generator, auth_generator, describe_string_prefix) {
    post_test(
        endpoint_generator,
        test_bodies,
        expected_vals_generator,
        auth_generator,
        "Values Tests",
        test_res_object_values
    )
}

module.exports = {
    get_keys_test,
    get_val_test,
    post_keys_test,
    post_val_test,
}