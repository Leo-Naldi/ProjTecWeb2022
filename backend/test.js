const axios = require("axios");

axios.post("http://localhost:8001/register/", {
    email: "lnaldi@gmail.com",
    password: "password",
    username: "lllleo"
}).then(res => {
    console.log(res);
})

/* {
    email: "leonardo.naldi@studio.unibo.it",
    password: "suppersafepassword4",
} */