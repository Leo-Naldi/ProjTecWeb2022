import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

import { services } from './defaultData';
import { filterAvailableServices, filterProviders } from "./filters";

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)


export function getMonthSchedule(provider, monthDate) {

    /* the schedule will be vaid for monthDate's month and year.
       each object represents the hour for a set of days (available_days) */
    let res = [{
        opening_morning: monthDate.hour(9),
        closing_morning: monthDate.hour(13),
        opening_afternoon: monthDate.hour(15).minute(30),
        closing_afternoon: monthDate.hour(19),
        available_days: [],
    }];

    for (let i = 1; i < monthDate.daysInMonth() + 1; i++) {

        // for now, push all days that arent weekends, in the future itll be determined serverside
        if ((monthDate.date(i).day() !== 0) && (monthDate.date(i).day() !== 6))
            res[0].available_days.push(i);
    }

    return new Promise((resolve, reject) => {
        resolve(res);
    })
}

// TODO put the schedule back in the providers
export function getProviders(type=null, date=null, city=null, pets=null) {
    
    let providers = [
        {
            id: 1,
            service_name: 'PaccianiPets',
            service_type: services[0],
            city: 'Bologna',
            pet_types: ['cani', 'gatti'],
            pet_sizes_min: null,
            pet_sizes_max: null,
        },
        {
            id: 2,
            service_name: 'Gianfranchi & Gianfranchi',
            service_type: services[0],
            city: 'Forli',
            pet_types: [],
            pet_sizes_min: null,
            pet_sizes_max: null,
        },
        {
            id: 3,
            service_name: 'God Please Kill Me Veterinari',
            service_type: services[0],
            city: 'Roma',
            pet_types: [],
            pet_sizes_min: null,
            pet_sizes_max: null,    
        },
        {
            id: 4,
            service_name: 'Piero Angela PetSitter',
            service_type: services[1],
            city: 'Roma',
            pet_types: [],
            pet_sizes_min: null,
            pet_sizes_max: null,
        },
        {
            id: 5,
            service_name: 'Gesu cristo',
            service_type: services[1],
            city: 'Roma',
            pet_types: [],
            pet_sizes_min: null,
            pet_sizes_max: null,
        },
    ];

    providers = filterProviders(providers, type, date, city, pets);


    return new Promise((resolve, reject) => resolve(providers));
}

export function getAllAvailableDays(schedule) {
    return schedule.reduce((c, s) => c.concat(s.available_days), []);
}

export function getEarliestAvailable(schedule) {

    if (schedule.length == 0) return -1;
    
    const days = getAllAvailableDays(schedule);

    const future = days.filter(d => schedule[0].opening_afternoon.date(d)
        .isSameOrAfter(dayjs(), 'day'));

    return ((future.length === 0) ? -1: Math.min(...future));
}


export function shouldDisableDate(schedule, date) {
    return getAllAvailableDays(schedule).indexOf(date.date()) === -1;
}

function makeTimeSlots(from, to, duration=20, unit='minute') {

    let slots = [];
    let current_start = from;
    let new_start;

    while (current_start.isSameOrBefore(to, unit)) {
        new_start = current_start.add(duration, unit);
        slots.push({
            from: current_start,
            to: new_start,
        });

        current_start = new_start;
    }

    return slots;
}

export function getDaySchedule(schedule, date) {
     
    return new Promise((resolve, reject) => {
        
        resolve([...makeTimeSlots(schedule[0].opening_morning, schedule[0].closing_morning),
            ...makeTimeSlots(schedule[0].opening_afternoon, schedule[0].closing_afternoon)]);
    });
}


export function getServices(providers=null) {

    return new Promise((resolve, reject) => { resolve(filterAvailableServices(services, providers)) });
}

export default getServices;


