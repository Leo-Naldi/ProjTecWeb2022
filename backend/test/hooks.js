require("dotenv").config();
const client = require("../config/client");

after(async function(){
    await client.close();
})