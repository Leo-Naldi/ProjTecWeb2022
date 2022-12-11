import { getAllAvailableDays, getEarliestAvailable, getMonthSchedule } from "../../utils/getServices";
import dayjs from 'dayjs';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

chai.use(chaiAsPromised);
chai.should();

// TODO fix this horseshit
describe("getServices Test Suite", function() {

    describe("#getMonthSchedule", function(){

        let schedule_promise;

        before(function() {
            schedule_promise = getMonthSchedule(null, dayjs());
        });

        it("Should eventually return a non empty array", function(done){
            
            schedule_promise.should.eventually.have.lengthOf
                .at.least(1).notify(done);
        });

        it("Should have opening times that come before the corresponding closing time", 
            function(done) {
                schedule_promise.then(sl => sl.every(s => {
                    return s.opening_morning.isBefore(s.closing_morning, 'minute') &&
                        s.opening_afternoon.isBefore(s.closing_afternoon, 'minute');
                })).should.eventually.be.true.notify(done);
        });

        it("Should contain only numbers from 1 to 31 in the available days", function(done){
            schedule_promise.then(schedule => {
                for (let s in schedule) {
                    for (let d in s.available_days){
                        d.should.be.within(1, 31);
                    }
                }
                done();
            })

        });

        it("Should not repeat available days", function (done) {
            schedule_promise
                .then(schedule => {
                    let counters = [];

                    for (let i = 0; i < 31; i++) counters.push(0);

                    for (let s in schedule) {
                        for (let d in s.available_days) {

                            counters[d - 1]++;
                            if (counters[d - 1] > 1) return false;
                        }
                    }
                    return true;
                }).should.eventually.be.true.notify(done);
        });
    });

    describe("#getEarliestAvailable", function(){

        it("Should not return a past day for current month schedule", function(done){
            getMonthSchedule(null, dayjs()).then(s => getEarliestAvailable(s))  
            .then(d => dayjs().date(d).isSameOrAfter(dayjs(), 'day'))
            .should.eventually.be.true.notify(done);
        });

        it("Should return a day that's actually in the available days", function(done){

            getMonthSchedule(null, dayjs()).then(s => {
                getAllAvailableDays(s).should.include(getEarliestAvailable(s));
                done();
            });
        });

        it("Schould return -1 if there are no available days", function(done){
            getMonthSchedule(null, dayjs().subtract(1, 'month'))
            .then(getEarliestAvailable).should.eventually.deep.equal(-1).notify(done);
        });
    });

});
