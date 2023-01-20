const axios = require("axios");
const dayjs = require("dayjs");
const duration = require('dayjs/plugin/duration')

dayjs.extend(duration)

const existing_user = {
    "username": "pieralberto",
    "email": "pieralberto.rossi333@gmail.com",
    "password": "iloveyou",
};
const existing_admin = {
    "username": "AdamoAmministratori",
    "email": "adamo@admin.sudo",
    "password": "iloveyou7",
};


//fetch("http://localhost:8001/login/user", {
//    method: "post",
//    headers: {
//        'Content-Type': 'application/json'
//    },
//    body: JSON.stringify({ email: 'leonardo.naldi@studio.unibo.it', password: 'supersafepassword4' })
//})


console.log(dayjs.duration({ months: 12}))

//axios.get("http://localhost:8001/products/id/63bc190a9ac1ef849a6b9240 ").then(res => {
//    console.log(res.data);
//});

/* {
    email: "leonardo.naldi@studio.unibo.it",
    password: "suppersafepassword4",
} */