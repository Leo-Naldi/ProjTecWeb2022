import dayjs from "dayjs";
import { filterAvailableServices, filterProviders } from "../utils/filters";

function goBack(state, step) {
    switch(step) {
        case (1) : {  // select service
            return {
                ...state,
                activeStep: 1,
                selectedService: null,    
                selectedProvider: null,   
                selectedDate: null,
                schedule: null,           
                displaySchedule: null,      
                timeSlots: null,          
                selectedTimeSlot: null,   
            };
        }

        case (2) : { // select provider
            return {
                ...state,
                activeStep: 2,
                selectedProvider: null,
                selectedDate: null,
                schedule: null,
                displaySchedule: null,
                timeSlots: null,
                selectedTimeSlot: null,
            };
        }
    }
}

export function bookingReducer(state, action) {

    /* Setting a form field resets most of the fields that come after it.
       This should hopefully prevent illegal states (like selecting a date that
       wasnt actually available) */

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
                    [action.id]: action.value,
                    selectedProvider: null,
                    schedule: null,
                    displaySchedule: null,
                    selectedDate: null,
                    timeSlots: null,
                    selectedTimeSlot: null,
                },
            };
        }

        case ('SELECT_SERVICE'): {

            let res = {
                ...state,
                selectedService: null,
                selectedProvider: null,
                schedule: null,
                displaySchedule: null,
                selectedDate: null,
                timeSlots: null,
                selectedTimeSlot: null,
            };

            if (state.selectedService != action.value){
                res.selectedService = action.value;
            }

            return res;
        }

        case ('FETCHED_PROVIDERS'): {
            let res =  {
                ...state,
                providers: action.value,
                schedule: null,
                displaySchedule: null,
                selectedDate: null,
                timeSlots: null,
                selectedTimeSlot: null,
                filteredProviders: action.value,
            };

            if (!action.value.some(p => p.id == state.selectedProvider)) res.selectedProvider = null;

            return res;
        }

        case ('SELECT_PROVIDER') : {

            let res = {
                ...state,
                schedule: null,
                displaySchedule: null,
                selectedDate: null,
                timeSlots: null,
                selectedTimeSlot: null,
            };

            if (state.selectedProvider !== action.value) {
                res.selectedProvider = action.value;
            }

            return res;
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

        case ('FETCHED_SERVICES') : {
            let res = {
                ...state,
                services: action.value,
            };

            if (action.value.indexOf(state.selectedProvider) == -1) {
                res.selectedService = null;
                res.selectedProvider = null;
                res.schedule = null;
                res.displaySchedule = null;
                res.selectedDate = null;
                res.timeSlots = null;
                res.selectedTimeSlot = null;
            }

            return res;
        }

        case ('CHANGE_MODAL') : {
            return {
                ...state,
                openFiltersModal: action.value,
            }
        }

        case ('FILTER_DATE') : {
            return {
                ...state,
                filterDate: action.value,
            };
        }

        case ('FILTER_CITY'): {
            return {
                ...state,
                filterCity: action.value,
            };
        }

        case ('CLEAR_FILTERS') : {
            return {
                ...state,
                filterCity: null,
                filterDate: null,
            };
        }

        case ('CLEAR') : {
            return action.value;
        }

        case ('APPLY_FILTERS') : {

            // TODO this is the stupidest shit ever written


            let filtered_providers = filterProviders(state.providers, null,
                state.filterDate, state.filterCity, action.pets);
            let filtered_services = filterAvailableServices(state.services, filtered_providers);

            let res = {
                ...state,
                filteredProviders: filtered_providers,
                filteredServices: filtered_services,
            };

            if ((state.selectedService !== null) &&
                (filtered_services.indexOf(state.selectedService) == -1)) {
                
                // filters date, city and pets have eliminated all providers with selectedService type
                
                res.selectedProvider = null;
                res.selectedService = null;

                return goBack(res, 1);

            } else if ((state.selectedProvider !== null) && 
                (!filtered_providers.some(p => p.id == state.selectedProvider))) {
                
                // there are still providers with selectedService type available, but selectedProvider si
                // no longer one of them

                res.selectedProvider = null;

                return goBack(res, 2);
            }

            // selectedService and selectedProvider are still available, or they were not set 
            // to begin with

            return res;
        }

        default : {
            throw Error("bookingReducer, unknown action type: " + action.type);
        }
    }
}

export default bookingReducer;