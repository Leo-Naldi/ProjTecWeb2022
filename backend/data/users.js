
db = connect('mongodb://localhost/TecWebDB');
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
                "type": "cane"
            },
            {
                "name": "Pierfrancesco",
                "size": "medio",
                "age": 1,
                "type": "gatto"
            }
        ],
        "type": "user"
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
        "type": "admin"
    }
]);