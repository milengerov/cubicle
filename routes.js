// const express = require("express");
// const Router = express.router;

const { Router } = require("express");

const productController = require("./controllers/productControllers");
const homeController = require("./controllers/homeControllers");
const accessoryController = require("./controllers/accessoryController");
const authController = require("./controllers/authController");

//middlewars:
const isAuthenticated = require("./middlewares/isAuthenticated");
const isGuest = require("./middlewares/isGuest");

const router = Router();


router.use("/", homeController);
router.use("/auth", authController);
router.use("/products", productController);
router.use("/accessories", accessoryController);

router.get("*", (req, res) => {
    res.render("404");   //{ layout: "main.hbs" } as second arg.  Default!
});


module.exports = router