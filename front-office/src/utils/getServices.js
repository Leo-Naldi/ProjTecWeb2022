import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

import { default_providers, makeDefaultSchedule, services } from './defaultData';
import { filterAvailableServices, filterProviders } from "./filters";
import getCities from "./getCities";

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)


export function getMonthSchedule(provider, monthDate) {

    return new Promise((resolve, reject) => {
        resolve(makeDefaultSchedule(monthDate));
    })
}

export function getProviders(type=null, date=null, city=null, pets=null) {

    let res = filterProviders(default_providers, type, date, city, pets);

    return new Promise((resolve, reject) => resolve(res));
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


