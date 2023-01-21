
db = connect('mongodb://localhost/TecWebDB');

const schedule = {
        openingMorning: null,
        closingMorning: null,
        openingAfternoon: null,
        closingAfternoon: null,
        workweek: [],
        vacations: [],
}

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