import { getMonthSchedule } from "../../utils/getServices";
import dayjs from 'dayjs';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
chai.should();

describe("getServices Test Suite", function() {

    describe("#getMonthSchedule", function(){

        it("Should eventually return a non empty array", function(done){
            
            getMonthSchedule(null, dayjs()).should.eventually.have.lengthOf
                .at.least(1).notify(done);
        });

        xit("Should have opening times that come before the corresponding closing time");

        xit("Should contain only numbers from 1 to 31 in the available days");

        xit("Should not repeat available days");
    });
});