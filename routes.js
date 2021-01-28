// const express = require("express");
// const Router = express.router;

const { Router } = require("express");
const productController = require("./controllers/productControllers")
const aboutController = require("./controllers/aboutControllers")

const router = Router();


router.use("/", productController);
router.use("/about", aboutController);


module.exports = router