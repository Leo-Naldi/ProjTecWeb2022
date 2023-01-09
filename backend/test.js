const axios = require("axios");

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

//axios.post("http://localhost:8001/login/user", existing_user).then(res => {
//    console.log(res.data.token);
//});

axios.post("http://localhost:8001/login/admin", existing_admin).then(res => {
    console.log(res.data.token);
});

/* {
    email: "leonardo.naldi@studio.unibo.it",
    password: "suppersafepassword4",
} */