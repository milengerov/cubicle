// const express = require("express");
// const Router = express.router;

const { Router } = require("express");
const productController = require("./controllers/productControllers");
const homeController = require("./controllers/homeControllers");
const accessoryController = require("./controllers/accessoryController");

const router = Router();


router.use("/", homeController);
router.use("/products", productController);
router.use("/accessories", accessoryController);

router.get("*", (req, res) => {
    res.render("404");   //{ layout: "main.hbs" } as second arg.  Default!
});


module.exports = router