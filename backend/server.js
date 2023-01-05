require("dotenv").config({ 'path': '../.local.env' });

const express = require('express');
const client = require('./db/client');
const { usersRouter } = require("./routes/users");

const app = express();


async function run() {

    try {
        await client.connect()

    } catch (e) {
        console.error(e);
        await client.disconnect();
    }

    app.use("/users", usersRouter);

    app.listen(process.env.BACKEND_PORT, () =>
        console.log(`Listening on port ${process.env.BACKEND_PORT}`));
}

run();




