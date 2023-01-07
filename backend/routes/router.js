const usersRouter = require("./users");
const productsRouter = require("./products");
const servicesRouter = require("./services");
const loginRouter = require("./login");
const registerRouter = require("./register");

const router = require("express").Router();

router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/services", servicesRouter);
router.use("/login", loginRouter);
router.use("/register", registerRouter);

// TODO protect shit

module.exports = router;