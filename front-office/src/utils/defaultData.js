import Dog1 from '../assets/images/dog.jpeg';
import Dog2 from '../assets/images/dog2.jpg';
import Dog3 from '../assets/images/dog3.jpg';

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
];

const pet_sizes = [
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

function makeDogs() {
    let dogs = [];

    for (let i = 0; i < dog_images.length; i++) {
        dogs.push({
            img: dog_images[i],
            name: dog_names[i],
            type: pet_types[0],
            age: i+1,
            size: pet_sizes[i + 3],
        });
    }

    return dogs.sort(() => Math.random() - 0.5); // shuffle the array
}

export const default_pets = makeDogs();

export const default_user = {
    username: 'leonaldi',
    email: 'lnaldi99@gmail.com',
    pets: default_pets,
};

export const services = ['Veterinario', 'Dog Sitter'];

export default default_user;