import bookingReducer from '../../reducers/bookingReducer';
import dayjs from 'dayjs';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { getEarliestAvailable, getMonthSchedule, getProviders } from '../../utils/getServices';

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

chai.use(chaiAsPromised);
chai.should();

describe("bookingReducer Test Suite", function(){

    let initial_state = {
        checkedPets: {
            fido: false,
            gatto:true,
        },
        selectedService: 'Veterinario',
        providers: [],
        selectedProvider: null,
        displaySchedule: null,
        selectedDate: null,
        schedule: null,
        timeSlots: null,
        selectedTimeSlot: null,
    }

    before(function(){
        return getProviders()
        .then(p => {
            initial_state.providers = p
            initial_state.selectedProvider = initial_state.providers[0].id;
            return getMonthSchedule(initial_state.providers[0], dayjs())
                .then(s => initial_state.displaySchedule = s);
        });
    });

    it("Should set schedule when date is selected", function(){

        let s = bookingReducer(initial_state, {
            type: 'SELECT_DATE',
            value: getEarliestAvailable(initial_state.displaySchedule),
        }).schedule;



        s.should.not.be.null;
        s.should.have.lengthOf(initial_state.displaySchedule.length);

        // TODO
    });

    it("Should not change date or schedule when changing the display schedule", function(){
    });

    it("Should unset everything except pets and filters when selecting services");

    it("Should unset everything when selecting providers");

    it("Should unset timeslots when the date is selected");

    it("Should unset selected time slot when the date is selected");

});