# Database Schema

Esempi di dati (nb: mongo crea di default un campo _id unico)

```javascript

// Tipi usati nel frontend
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


// Taglie usate nel frontend
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

// Categorie prodotti
const categories = [
    'giocattoli',
    'igene',
    'accessori',
    'cibo',
    'armi di distruzione di massa',
];

db.createCollection('users');
db.createCollection('services');
db.createCollection('messages');  // TODO
db.createCollection('products');


db.users.insertMany([
    {
        "username": "Leonaldi",
        "email": "leonardo.naldi@studio.unibo.it",
        "password": "suppersafepassword4",
        "pets": [
            {
                "name": "Alberto",
                "size": "medio",
                "age": 3,
                "type": "cane",
            },
            {
                "name": "Pierfrancesco",
                "size": "medio",
                "age": 1,
                "type": "gatto",
            },
        ],
    },
    {
        "username": "pieralberto",
        "email": "pieralberto.rossi@gmail.com",
        "password": "iloveyou",
        "pets": [
            {
                "name": "Micio",
                "size": "medio",
                "age": 7,
                "type": "pesce",
            },
            {
                "name": "Carlo",
                "size": "medio",
                "age": 99,
                "type": "cane",
            },
            {
                "name": "Rhgte-k'ptah",
                "size": "apocalittico",
                "age": 80085,
                "type": "orrore lovecraftiano",
            },
        ],
    },
]);

db.products.insertMany([
    {
        "img": "https://source.unsplash.com/random",
        "name": `Osso giocattolo placcato in oro`,
        "price": 900,
        "categories": ["giocattoli", "accessori"],
        "pet_types": ["cane"],
    },
])
```