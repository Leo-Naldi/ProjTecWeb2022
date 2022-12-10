import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

export const services = ['Veterinario', 'Dog Sitter'];

export function getMonthSchedule(provider, monthDate) {

    let res = [{
        opening_morning: dayjs().hour(9),
        closing_morning: dayjs().hour(13),
        opening_afternoon: dayjs().hour(15).minute(30),
        closing_afternoon: dayjs().hour(19),
        available_days: [],
        date: monthDate,  // month and year of the schedule
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

export function getProviders(type='Veterinario', start_date=null, end_date=null, time=null) {

    let providers = [
        {
            id: 1,
            service_name: 'PaccianiPets',
            service_type: services[0],
            city: 'Bologna',
            pet_types: ['cani', 'gatti'],
        },
        {
            id: 2,
            service_name: 'Gianfranchi & Gianfranchi',
            service_type: services[0],
            city: 'Forli',
            pet_types: [],
        },
        {
            id: 3,
            service_name: 'God Please Kill Me Veterinari',
            service_type: services[0],
            city: 'Roma',
            pet_types: [],    
        },
    ];

    // in the future the time slots will be sent by the server. maybe.
    for (let j = 0; j < providers.length; j++) { 
        getMonthSchedule(providers[j], dayjs()).then((days) => {
            providers[j].schedule.available_days = days;
        })
    }

    return new Promise((resolve, reject) => resolve(providers));
}

// TODO this fails if no date is available
export function getEarliestAvailable(schedule) {
    
    return Math.min(schedule.map((s) => {
        return Math.min(s.available_days.filter(d => s.date.date(d).isSameOrAfter(dayjs(), 'day')));
    }));
}

// TODO make this work using all the schedule
export function shouldDisableDate(schedule, date) {
    return schedule[0].available_days.indexOf(date.date()) === -1;
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

export function getServices() {
    return services;
}

export default getServices;


