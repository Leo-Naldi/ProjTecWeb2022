import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore)

export const services = ['Veterinario', 'Dog Sitter'];

export function getMonthSchedule(provider, monthDate) {

    let res = [];

    for (let i = 1; i < monthDate.daysInMonth() + 1; i++) {

        // for now, push all days that arent weekends, in the future itll be determined serverside
        if ((monthDate.date(i).day() !== 0) && (monthDate.date(i).day() !== 6))
            res.push(i);
    }

    return new Promise((resolve, reject) => {
        resolve(res);
    })
}

export function getProviders(type='Veterinario', start_date=null, end_date=null, time=null) {

    let providers = [
        {
            service_name: 'PaccianiPets',
            service_type: services[0],
            city: 'Bologna',
            pet_types: ['cani', 'gatti'],
            schedule: {
                opening_morning: dayjs().hour(9),
                closing_morning: dayjs().hour(13),
                opening_afternoon: dayjs().hour(15).minute(30),
                closing_afternoon: dayjs().hour(19),
                available_days: [],
                date: dayjs(),  // month and year of the schedule
            },
        },
        {
            service_name: 'Gianfranchi & Gianfranchi',
            service_type: services[0],
            city: 'Forli',
            pet_types: [],
            schedule: {
                opening_morning: dayjs().hour(9),
                closing_morning: dayjs().hour(13),
                opening_afternoon: dayjs().hour(15).minute(30),
                closing_afternoon: dayjs().hour(19),
                available_days: [],
                date: dayjs(),
            },
        },
        {
            service_name: 'God Please Kill Me Veterinari',
            service_type: services[0],
            city: 'Roma',
            pet_types: [],
            schedule: {
                opening_morning: dayjs().hour(9),
                closing_morning: dayjs().hour(13),
                opening_afternoon: dayjs().hour(15).minute(30),
                closing_afternoon: dayjs().hour(19),
                available_days: [],
                date: dayjs(),
            },
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



export function shouldDisableDate(provider, date) {
    return provider.schedule.available_days.indexOf(date.date()) === -1;
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

export function getDaySchedule(provider, date) {
     
    return new Promise((resolve, reject) => {
        
        resolve([...makeTimeSlots(provider.schedule.opening_morning, provider.schedule.closing_morning),
            ...makeTimeSlots(provider.schedule.opening_afternoon, provider.schedule.closing_afternoon)]);
    });
}

export function getServices() {
    return services;
}

export default getServices;


