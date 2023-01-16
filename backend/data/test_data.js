const existing_user = {
    "username": "pieralberto",
    "email": "pieralberto.rossi@gmail.com",
    "password": "iloveyou",
};

const existing_user2 = {
    "username": "Leonaldi",
    "email": "leonardo.naldi@studio.unibo.it",
    "password": "suppersafepassword4",
}

const existing_admin = {
    "username": "AdamoAmministratori",
    "email": "adamo@admin.sudo",
    "password": "iloveyou7",
};

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
    existing_user2,
    existing_admin, 
    make_new_admin,
    make_new_user,
    make_new_service,
    make_new_product,
}