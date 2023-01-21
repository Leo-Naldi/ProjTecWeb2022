db = connect('mongodb://localhost/TecWebDB');

const unum = 0; // user number 
const snum = 0; // service number
const pnum = 0; // product number
const anum = 0; // appointment number

db.createCollection('users', {
    validator: {
       '$jsonSchema': {
            bsonType: 'object',
            title: "User Object Validator",
            required: ['username', 'email', 'password', 'pets','type'],
            properties: {
                usename: {
                    bsonType: 'string',
                },
                email: {
                    bsonType: 'string',
                },
                password: {
                    bsonType: 'string',
                },
                type: {
                    enum: ['user', 'admin'],
                },
                pets: {
                    bsonType: 'array',
                    items: {
                        bsonType: 'object',
                        required: ['name', 'size', 'age', 'type'],
                        properties: {
                            name: {
                                bsonType: 'string',
                            },
                            size: {
                                enum: [
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
                                ],
                            },
                            age: {
                                bsonType: 'int',
                            },
                            type: {
                                enum: [
                                    'cane',
                                    'gatto',
                                    'rettile',
                                    'uccello',
                                    'scoiattolo',
                                    'pesce',
                                    'ragno',
                                    'orrore lovecraftiano',
                                    'criceto',
                                ]
                            }
                        }
                    }
                }
            }
        }
    }
});
db.users.createIndex({ "email": 1 }, { unique: true });

db.createCollection('services');


db.createCollection('products');

function make_new_user() {
    return {
        "username": `pieraldofrancescani${unum++}`,
        "email": `pieraldo.francescani${unum++}@gmail.com`,
        "password": "333jd",
    };
}

function make_new_admin() {
    return {
        "username": `adamo223${unum++}`,
        "email": `ad_min223${unum++}@gmail.com`,
        "password": "3334jd",
    };
}

function make_new_service() {

    return {
        "name": `verygoodserivice${snum++}`,
        "type": "dog sitter",
        "city": "Bologna",
        "petTypes": [
            "cane",
            "gatto",
            "rettile",
            "uccello",
            "scoiattolo",
            "pesce",
            "ragno"
        ],
        "sizesMin": "subatomico",
        "sizesMax": null
    };
}

function make_new_product() {
    return {
        "img": null,
        "price": pnum * 10 + 2,
        "name": `jisusproduct${pnum++}`,
        "categories": ['giocattoli'],
        "petTypes": ['cane',
            'gatto',
            'rettile',
            'scoiattolo',
            'pesce',
        ],
        "inStore": 42.
    }
}

db.users.insertMany([
    {
        username: "Leonaldi",
        email: "leonardo.naldi@studio.unibo.it",
        password: "suppersafepassword4",
        pets: [
            {
                name: "Alberto",
                size: "medio",
                age: 3,
                type: "cane"
            },
            {
                name: "Pierfrancesco",
                size: "medio",
                age: 1,
                type: "gatto"
            }
        ],
        type: "user"
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
                "type": "pesce"
            },
            {
                "name": "Carlo",
                "size": "medio",
                "age": 99,
                "type": "cane"
            },
            {
                "name": "Rhgte-k'ptah",
                "size": "apocalittico",
                "age": 80085,
                "type": "orrore lovecraftiano"
            }
        ],
        "type": "user"
    },
    {
        "username": "AdamoAmministratori",
        "email": "adamo@admin.sudo",
        "password": "iloveyou7",
        "pets": [],
        "type": "admin"
    }
]);

db.services.insertMany([
    {
        "name": "InaccioPets",
        "type": "veterinario",
        "city": "Bologna",
        "petTypes": [
            "cane",
            "gatto",
            "rettile",
            "uccello",
            "scoiattolo",
            "pesce",
            "ragno"
        ],
        "sizesMin": "subatomico",
        "sizesMax": null
    },
    {
        "name": "Gianfranchi & Gianfranchi",
        "type": "veterinario",
        "city": "Forli",
        "petTypes": [],
        "sizesMin": "piccolo",
        "sizesMax": "gargantuesco"
    },
    {
        "name": "God Please Kill Me Veterinari",
        "type": "veterinario",
        "city": "Roma",
        "petTypes": [],
        "sizesMin": null,
        "sizesMax": null
    },
    {
        "name": "Piero Angela PetSitter",
        "type": "pet sitter",
        "city": "Roma",
        "petTypes": [],
        "sizesMin": null,
        "sizesMax": null
    },
    {
        "name": "Gesu cristo",
        "type": "pet sitter",
        "city": "Roma",
        "petTypes": [],
        "sizesMin": null,
        "sizesMax": null
    },
    {
        "name": "PetSitterTM",
        "type": "pet sitter",
        "city": "Frosinone",
        "petTypes": [
            "scoiattolo",
            "pesce",
            "ragno",
            "serpente"
        ],
        "sizesMin": null,
        "sizesMax": null
    }
]);

db.products.insertMany([
    {
        "img": "https://source.unsplash.com/random",
        "name": "Osso giocattolo placcato in oro",
        "price": 900,
        "categories": [
            "giocattoli",
            "accessori"
        ],
        "petTypes": [
            "cane"
        ],
        "inStore": 100,
    },
    {
        "img": "https://source.unsplash.com/random",
        "name": "Cuccia Tipo 1",
        "price": 90,
        "categories": [
            "giocattoli",
            "accessori"
        ],
        "petTypes": [
            "cane",
            "gatto"
        ],
        "inStore": 10,
    },
    {
        "img": "https://source.unsplash.com/random",
        "name": "Cuccia Tipo 2",
        "price": 50,
        "categories": [
            "giocattoli",
            "accessori"
        ],
        "petTypes": [
            "cane",
            "gatto"
        ],
        "inStore": 10,
    },
    {
        "img": "https://source.unsplash.com/random",
        "name": "Cuccia Tipo31",
        "price": 10,
        "categories": [
            "giocattoli",
            "accessori"
        ],
        "petTypes": [
            "cane",
            "gatto"
        ],
        "inStore": 10,
    },
    {
        "img": "https://source.unsplash.com/random",
        "name": "Confezione 78.5 kg croccantini",
        "price": 146,
        "categories": [
            "cibo"
        ],
        "petTypes": [
            "cane",
            "orrore lovecraftiano"
        ],
        "inStore": 10
    },
    {
        "img": "https://source.unsplash.com/random",
        "name": "Croccantini Universali",
        "price": 86,
        "categories": [
            "cibo",
            "armi di distruzione di massa"
        ],
        "petTypes": [],
        "inStore": 10,
    }
]);