const axios = require("axios");

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

axios.post("http://localhost:8001/users/email/" + existing_user.email, { username: 'albano' }).then(res => {
    console.log(res.json().body);
});

//axios.get("http://localhost:8001/products/id/63bc190a9ac1ef849a6b9240 ").then(res => {
//    console.log(res.data);
//});

/* {
    email: "leonardo.naldi@studio.unibo.it",
    password: "suppersafepassword4",
} */