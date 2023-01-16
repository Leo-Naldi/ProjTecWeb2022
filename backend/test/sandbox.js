require("dotenv").config();
const should = require("chai").should();

describe("Random tries", function(){
    it("Should work", function(done){
        const arr = [
            {
                a: 1,
                b: 2,
                c: 3,
            },
            {
                a: 4,
                b: 5,
            }, 
            {
                a: 4,
                b: 5,
            },
        ]

        arr[0].should.include({a: 1, b: 2})
        done();
    })
})