const existing_user = {
    "username": "pieralberto",
    "email": "pieralberto.rossi@gmail.com",
    "password": "iloveyou",
};
const existing_admin = {
    "username": "AdamoAmministratori",
    "email": "adamo@admin.sudo",
    "password": "iloveyou7",
};

const new_user = {
    "username": "pieraldofrancescani",
    "email": "pieraldo.francescani@gmail.com",
    "password": "333jd",
}

const new_admin = {
    "username": "adamo2",
    "email": "ad_min@gmail.com",
    "password": "3334jd",
}

const new_product1 = {
    "img": null,
    "price": 42,
    "name": "inshtallah",
    "categories": ['giocattoli'],
    "pet_types": ['cane',
        'gatto',
        'rettile',
        'uccello',
        'scoiattolo',
        'pesce',
    ],
    "in_store": 444.
}

const new_product2 = {
    "img": null,
    "price": 42,
    "name": "inshtallah2",
    "categories": ['giocattoli'],
    "pet_types": ['cane',
        'gatto',
        'rettile',
        'uccello',
        'scoiattolo',
        'pesce',
    ],
    "in_store": 444.
}

const new_service1 = {
    "name": "jbnkjjjjjjj",
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
}

const new_service2 = {
    "name": "wkrjvbeiwrbvioeurnbvjjjjjjj",
    "type": "dog sitter",
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
}

module.exports = { 
    existing_user, 
    existing_admin, 
    new_user, 
    new_admin, 
    new_product1,
    new_product2,
    new_service1,
    new_service2,
}