
db = connect('mongodb://localhost/TecWebDB');
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