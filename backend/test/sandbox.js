require("dotenv").config();
const should = require("chai").should();

describe("Random tries", function(){
    it("Should work", function(done){
        const arr = [
            {
                a: 1,
                b: 2,
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

        arr.should.be.an('array').that.is.not.empty;
        arr.map(v => { v.should.be.an('object').that.has.all.keys('a', 'b') })
        done();
    })
})