
db = connect('mongodb://localhost/TecWebDB');

db.services.insertMany([
    {
            "name": "InaccioPets",
            "type": "veterinario",
            "city": "Bologna",
            "pet_types": [
                "cane", 
                "gatto", 
                "rettile", 
                "uccello", 
                "scoiattolo", 
                "pesce", 
                "ragno"
            ],
            "sizes_min": "subatomico",
            "sizes_max": null
    },
    {
            "name": "Gianfranchi & Gianfranchi",
            "type": "veterinario",
            "city": "Forli",
            "pet_types": [],
            "sizes_min": "piccolo",
            "sizes_max": "gargantuesco"
    },
    {
            "name": "God Please Kill Me Veterinari",
            "type": "veterinario",
            "city": "Roma",
            "pet_types": [],
            "sizes_min": null,
            "sizes_max": null
    },
    {
            "name": "Piero Angela PetSitter",
            "type": "pet sitter",
            "city": "Roma",
            "pet_types": [],
            "sizes_min": null,
            "sizes_max": null
    },
    {
            "name": "Gesu cristo",
            "type": "pet sitter",
            "city": "Roma",
            "pet_types": [],
            "sizes_min": null,
            "sizes_max": null
    },
    {
        "name": "PetSitterTM",
        "type": "pet sitter",
        "city": "Frosinone",
        "pet_types": [
            "scoiattolo",
            "pesce",
            "ragno",
            "serpente"
        ],
        "sizes_min": null,
        "sizes_max": null
    }
]);