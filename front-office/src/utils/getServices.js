import dayjs from "dayjs";


// contains dummydata, when backend is implemented it will fetch it 

export const services = ['Veterinario', 'Dog Sitter'];

// index is the day (0 is Sun, 6 is Sat, according to dayjs)
const standard_workweek = [
    {
        start_morning: null,
        end_morning: null,
        start_afternoon: null,
        end_afternoon: null,
    },
    {
        start_morning: dayjs().hour(9),
        end_morning: dayjs().hour(13),
        start_afternoon: dayjs().hour(15).minute(30),
        end_afternoon: dayjs().hour(19),
    },
    {
        start_morning: dayjs().hour(9),
        end_morning: dayjs().hour(13),
        start_afternoon: dayjs().hour(15).minute(30),
        end_afternoon: dayjs().hour(19),
    },
    {
        start_morning: dayjs().hour(9),
        end_morning: dayjs().hour(13),
        start_afternoon: dayjs().hour(15).minute(30),
        end_afternoon: dayjs().hour(19),
    },
    {
        start_morning: dayjs().hour(9),
        end_morning: dayjs().hour(13),
        start_afternoon: dayjs().hour(15).minute(30),
        end_afternoon: dayjs().hour(19),
    },
    {
        start_morning: dayjs().hour(9),
        end_morning: dayjs().hour(13),
        start_afternoon: dayjs().hour(15).minute(30),
        end_afternoon: dayjs().hour(19),
    },
    {
        start_morning: null,
        end_morning: null,
        start_afternoon: null,
        end_afternoon: null,
    },
]

let providers = [
    {
        service_name: 'PaccianiPets',
        service_type: services[0],
        city: 'Bologna',
        pet_types: ['cani', 'gatti'],
        workweek: [...standard_workweek],
        available_dates: null, 
    },
    {
        service_name: 'Gianfranchi & Gianfranchi',
        service_type: services[0],
        city: 'Forli',
        pet_types: [],  
        workweek: [...standard_workweek],
        available_dates: null,
    },
    {
        service_name: 'God Please Kill Me Veterinari',
        service_type: services[0],
        city: 'Roma',
        pet_types: [], 
        workweek: [...standard_workweek],
        available_dates: null,
    },
];

export function getProviders(type='Veterinario', start_date=null, end_date=null, time=null) {

    for (let i = 0; i < providers.length; i++) {
        providers[i].available_dates = {
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
        };
    }

    console.log(dayjs().day())

    return providers;
}



export function shouldDisableDate(provider, date) {

    // True if date is not in the available dates (aka if the date is not available)

    return !(Object.keys(provider.available_dates).some((dstring) => 
        (dayjs(dstring).isSame(date, 'day'))));
}

export function getServices() {
    return services;
}

export default getServices;