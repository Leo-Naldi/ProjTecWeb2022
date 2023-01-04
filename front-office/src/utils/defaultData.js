import Dog1 from '../assets/images/dog.jpeg';
import Dog2 from '../assets/images/dog2.jpg';
import Dog3 from '../assets/images/dog3.jpg';
import getCities from './getCities';

import dayjs from 'dayjs';

// TODO comments

export const services = ['veterinario', 'pet sitter'];

const pet_types = [
    'cane', 
    'gatto', 
    'rettile', 
    'uccello', 
    'scoiattolo', 
    'pesce', 
    'ragno',
    'orrore lovecraftiano',
    'criceto',
    'serpente',
];

export const pet_sizes = [
    'subatomico',
    'microscopico',
    'minuscolo',
    'piccolo',
    'medio',
    'grande',
    'immenso',
    'colossale',
    'gargantuesco',
    'apocalittico',
];

const dog_images = [Dog1, Dog2, Dog3];
const dog_names = ['Fido', 'Pippo', 'Gatto'];

function makeDefaultProviders() {

    let id = 0;
    const cities = getCities();

    const providers = [
        {
            id: id++,
            service_name: 'PaccianiPets',
            service_type: services[0],
            city: cities[1],
            pet_types: pet_types.slice(0, 3),
            pet_sizes_min: null,
            pet_sizes_max: null,
        },
        {
            id: id++,
            service_name: 'Gianfranchi & Gianfranchi',
            service_type: services[0],
            city: cities[0],
            pet_types: [],
            pet_sizes_min: null,
            pet_sizes_max: null,
        },
        {
            id: id++,
            service_name: 'God Please Kill Me Veterinari',
            service_type: services[0],
            city: cities[2],
            pet_types: [],
            pet_sizes_min: null,
            pet_sizes_max: null,
        },
        {
            id: id++,
            service_name: 'Piero Angela PetSitter',
            service_type: services[1],
            city: cities[2],
            pet_types: [],
            pet_sizes_min: null,
            pet_sizes_max: null,
        },
        {
            id: id++,
            service_name: 'Gesu cristo',
            service_type: services[1],
            city: cities[2],
            pet_types: [],
            pet_sizes_min: null,
            pet_sizes_max: null,
        },
    ];

    for (let i = 0; i < providers.length; i++) {
        providers[i].pet_sizes_min = pet_sizes.slice(0, 4)[Math.floor(Math.random() * 4)];
        providers[i].pet_sizes_max = pet_sizes.slice(5, pet_sizes.length - 1)[Math.floor(Math.random() * 4)];
        
        if (providers[i].pet_types.length == 0) providers[i].pet_types = [...pet_types];
    }

    providers[1].pet_sizes_max = pet_sizes[pet_sizes.length - 1];

    return providers;
}

function makeDefaultPets() {
    let pets = [];
    let id = 0;

    for (let i = 0; i < dog_images.length; i++) {
        pets.push({
            id: id++,
            img: dog_images[i],
            name: dog_names[i],
            type: pet_types[0],
            age: i+1,
            size: pet_sizes[i + 3],
        });
    }

    pets.push({
        id: id++,
        img: null,
        name: "Ryl'p-gewahcht",
        type: pet_types[7],
        age: NaN,
        size: pet_sizes[pet_sizes.length - 1],
    });


    return pets.sort(() => Math.random() - 0.5); // shuffle the array
}

export function makeDefaultSchedule(monthDate) {
    let res = [{
        opening_morning: monthDate.hour(9),
        closing_morning: monthDate.hour(13),
        opening_afternoon: monthDate.hour(15).minute(30),
        closing_afternoon: monthDate.hour(19),
        available_days: [], // 1 - 31
    }];

    for (let i = 1; i < monthDate.daysInMonth() + 1; i++) {

        // for now, push all days that arent weekends, in the future itll be determined serverside
        if ((monthDate.date(i).day() !== 0) && (monthDate.date(i).day() !== 6))
            res[0].available_days.push(i);
    }

    return res;
}

export const default_pets = makeDefaultPets();

export const default_providers = makeDefaultProviders();

export const default_schedule = makeDefaultSchedule(dayjs());

export const default_user = {
    username: 'leonaldi',
    email: 'lnaldi99@gmail.com',
    pets: default_pets,
};

export default default_user;