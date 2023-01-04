require("dotenv").config({ 'path': '../.local.env' });

const express = require('express');
const { connectDB, disconnectDB, db } = require('./db/client');

const app = express();

connectDB().then(() => {

    app.listen(process.env.BACKEND_PORT, () =>
        console.log(`Listening on port ${process.env.BACKEND_PORT}`));

})
.catch(e => console.error(e));

