require("dotenv").config({ 'path': '../.local.env' });

const server = require('./server/server');
const client = require('./db/client');


async function run() {

    try {
        await client.connect()

    } catch (e) {
        console.error(e);
        await client.disconnect();
    }

    const db = client.db(process.env.MONGO_DBNAME);

    server.listen(process.env.BACKEND_PORT, () =>
        console.log(`Listening on port ${process.env.BACKEND_PORT}`));
}

run();




