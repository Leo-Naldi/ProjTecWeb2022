const axios = require("axios");

axios.post("http://localhost:8001/login/user", {
    email: "lnaldi@gmail.com",
    password: "password",
}).then(res => {
    console.log(res.data.token);
})

/* {
    email: "leonardo.naldi@studio.unibo.it",
    password: "suppersafepassword4",
} */