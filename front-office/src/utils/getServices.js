import dayjs from "dayjs";

/*
const workday = {
    start_morning: '',
    duration_morning: '',
    start_evening: '',
    duration_evening: '',
};

const provider = {
    workday: '',
    bookings: [
        {
            id: '',
            date: '',
            time: '',
            duration: '',
        },
        // and more
    ],
    pet_types: [
        // types of pets
    ],
}
*/


export const services = ['Veterinario', 'Dog Sitter'];

const veterinari = [
    {
        nome_clinica: 'PaccianiPets',
        citta: 'Bologna',
        pet_types: ['cani', 'gatti'],
        start_morning: dayjs().hour(9),
        end_morning: dayjs().hour(13),
        start_afternoon: dayjs().hour(15).minute(30),
        end_afternoon: dayjs().hour(19),
    },
    {
        nome_clinica: 'Gianfranchi & Gianfranchi',
        citta: 'Forli',
        pet_types: [],  
        start_morning: dayjs().hour(9),
        end_morning: dayjs().hour(13),
        start_afternoon: dayjs().hour(15).minute(30),
        end_afternoon: dayjs().hour(19),
    },
    {
        nome_clinica: 'God Please Kill Me Veterinari',
        citta: 'Roma',
        pet_types: [], 
        start_morning: dayjs().hour(9),
        end_morning: dayjs().hour(13),
        start_afternoon: dayjs().hour(15).minute(30),
        end_afternoon: dayjs().hour(19),
    },
];


export function getServices() {
    return [
    ];
}

export default getServices;