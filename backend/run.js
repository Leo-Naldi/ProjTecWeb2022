require("dotenv").config();

const server = require('./config/server');
const client = require('./config/client');


async function run() {

    await client.connect();

    server.listen(process.env.BACKEND_PORT, () =>
        console.log(`Listening on port ${process.env.BACKEND_PORT}`));
}

run();




