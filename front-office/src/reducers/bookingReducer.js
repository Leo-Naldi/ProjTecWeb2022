import dayjs from "dayjs";

export function bookingReducer(state, action) {
    switch (action.type) {

        case('CHANGE_STEP') : {
            return {
                ...state,
                activeStep: action.value,
            };
        }

        case ('CHECK_PET') : {
            return {
                ...state,
                checkedPets: {
                    ...state.checkedPets,
                    [action.id]: action.value
                },
                selectedService: null,
                providers: [],
                selectedProvider: null,
                schedule: null,
                displaySchedule: null,
                selectedDate: null,
                timeSlots: null,
                selectedTimeSlot: null,
            };
        }

        case ('SELECT_SERVICE'): {
            return {
                ...state,
                selectedService: action.value,
                providers: [],
                selectedProvider: null,
                schedule: null,
                displaySchedule: null,
                selectedDate: null,
                timeSlots: null,
                selectedTimeSlot: null,
            };
        }

        case ('FETCHED_PROVIDERS'): {
            return {
                ...state,
                providers: action.value,
                selectedProvider: null,
                schedule: null,
                displaySchedule: null,
                selectedDate: null,
                timeSlots: null,
                selectedTimeSlot: null,
            };
        }

        case ('SELECT_PROVIDER') : {
            return {
                ...state,
                selectedProvider: action.value,
                schedule: null,
                displaySchedule: null,
                selectedDate: null,
                timeSlots: null,
                selectedTimeSlot: null,
            };
        }

        case('FETCHED_DISPLAY_SCHEDULE') : {
            return {
                ...state,
                displaySchedule: action.value,
            };
        }

        case ('SELECT_DATE') : {

            let res = {
                ...state,
                selectedDate: action.value,
                schedule: [],
                timeSlots: null,
                selectedTimeSlot: null,
            };

            for (let i = 0; i < state.displaySchedule.length; i++) {
            
                res.schedule.push({
                    opening_morning: dayjs(state.displaySchedule[i].opening_morning),
                    closing_morning: dayjs(state.displaySchedule[i].closing_morning),
                    opening_afternoon: dayjs(state.displaySchedule[i].opening_afternoon),
                    closing_afternoon: dayjs(state.displaySchedule[i].closing_afternoon),
                    available_days: [...state.displaySchedule[i].available_days],
                });
            }

            return res;
        }

        case ('FETCHED_TIME_SLOTS') : {
            return {
                ...state,
                timeSlots: action.value,
                selectedTimeSlot: null,
            };
        }

        case ('SELECT_TIME_SLOT') : {
            return {
                ...state,
                selectedTimeSlot: action.value,
            };
        }

        case ('CHANGE_DISPLAY_MONTH') : {
            return {
                ...state,
                displaySchedule: action.value,
            };
        }

        default : {
            throw Error("bookingReducer, unknown action with type: " + action.type);
        }
    }
}

export default bookingReducer;