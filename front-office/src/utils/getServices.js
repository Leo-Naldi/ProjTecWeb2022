import dayjs from "dayjs";


export const services = ['Veterinario', 'Dog Sitter'];

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
            },
        },
    ];

    // in the future the time slots will be sent by the server. maybe.
    for (let j = 0; j < providers.length; j++) {

        for (let i = 0; i < dayjs().daysInMonth(); i++) {

            // for now, push all days that arent weekends, in the future itll be determined serverside
            if ((dayjs().date(i).day() !== 0) && (dayjs().date(i).day() !== 6))
                providers[j].schedule.available_days.push(i);
        }
    }

    return new Promise((resolve, reject) => resolve(providers));
}



export function shouldDisableDate(provider, date) {
    return provider.schedule.available_days.indexOf(date.date()) === -1;
}

export function getDaySchedule(provider, date) {

    // TODO

}

export function getServices() {
    return services;
}

export default getServices;


/* providers[i].available_slots = {
            [dayjs().add(7, "days").toISOString()]: [
                {
                    start: dayjs().add(7, 'day').hour(9),
                    end: dayjs().add(7, 'day').hour(11).minute(30),
                },
                {
                    start: dayjs().add(7, 'day').hour(16),
                    end: dayjs().add(7, 'day').hour(18).minute(15),
                }
            ],
            [dayjs().add(8, "days").toISOString()]: [
                {
                    start: dayjs().add(8, 'day').hour(10).minute(30),
                    end: dayjs().add(8, 'day').hour(12),
                },
                {
                    start: dayjs().add(8, 'day').hour(15),
                    end: dayjs().add(8, 'day').hour(17).minute(30),
                },
            ],
            [dayjs().add(9, "days").toISOString()]: [
                {
                    start: dayjs().add(9, 'day').hour(9),
                    end: dayjs().add(9, 'day').hour(10).minute(30),
                }
            ]

            
        }; */