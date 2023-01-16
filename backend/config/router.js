/*
    Main router
*/

const usersRouter = require("../routes/users");
const productsRouter = require("../routes/products");
const servicesRouter = require("../routes/services");
const loginRouter = require("../routes/login");


const router = require("express").Router();

router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/services", servicesRouter);
router.use("/login", loginRouter);

module.exports = router;