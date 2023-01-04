const express = express();
const router = express.Router();

const {
    userAdd,
    userModify,
    userDelete,
    userQuery,
    usersGetAll } = require("../db/users");

/* /users/ uri paths */


router.get('/', async (req, res) => {
    const users = await usersGetAll();
    res.send(users);
});

router.post('/', async (req, res) => {
    await userAdd(req.data);

    // TODO check if user with this email already existed
});

router.get('/id/:id', async (req, res) => {});

router.get('/email/:email', async (req, res) => {});