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

const new_user2 = {
    "username": "pieraldofrancescani2",
    "email": "pieraldo.francescani2@gmail.com",
    "password": "333jd",
}

const new_user3 = {
    "username": "pieraldofrancescani23",
    "email": "pieraldo.francescani23@gmail.com",
    "password": "333jd",
}

const new_admin = {
    "username": "adamo2",
    "email": "ad_min@gmail.com",
    "password": "3334jd",
}

const new_admin2 = {
    "username": "adamo22",
    "email": "ad_min22@gmail.com",
    "password": "3334jd",
}

const new_admin3 = {
    "username": "adamo223",
    "email": "ad_min223@gmail.com",
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

const new_product3 = {
    "img": null,
    "price": 42,
    "name": "inshtallah3",
    "categories": ['giocattoli'],
    "pet_types": ['cane',
        'gatto',
        'rettile',
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

let userid = 0;
let adminid = 0;
let productid = 0;
let serviceid = 0;

function make_new_user() {
    return {
        "username": `pieraldofrancescani${userid++}`,
        "email": `pieraldo.francescani${userid++}@gmail.com`,
        "password": "333jd",
    };
}

function make_new_admin() {
    return {
        "username": `adamo223${adminid++}`,
        "email": `ad_min223${adminid++}@gmail.com`,
        "password": "3334jd",
    };
}

function make_new_service() {

    return {
        "name": `verygoodserivice${serviceid++}`,
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
    };
}

function make_new_product() {
    return {
        "img": null,
        "price": productid * 10 + 2,
        "name": `jisusproduct${productid++}`,
        "categories": ['giocattoli'],
        "pet_types": ['cane',
            'gatto',
            'rettile',
            'scoiattolo',
            'pesce',
        ],
        "in_store": 42.
    }
}

module.exports = { 
    existing_user, 
    existing_admin, 
    new_user, 
    new_user2,
    new_user3,
    new_admin, 
    new_admin2,
    new_admin3,
    new_product1,
    new_product2,
    new_product3,
    new_service1,
    new_service2,
    make_new_admin,
    make_new_user,
    make_new_service,
    make_new_product,
}