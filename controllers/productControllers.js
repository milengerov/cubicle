const { Router } = require("express");
const productService = require("../services/productService");
const accessoryService = require("../services/accessoryService");
const { validateInputs } = require("./helpers/helpers");

const router = Router();


router.get("/", (req, res) => {
    let queries = req.query;
    productService.getAll(queries)
        .then((products) => {
            console.log(products);
            res.render("home", { title: "Browse", products });
        })
        .catch(() => res.status(400))

});

router.get("/create", (req, res) => {
    res.render("create", { title: "Create" });

});

router.post("/create", validateInputs, (req, res) => {
    // console.log(req.body);

    // TODO: Validate inputs later! => done with middleware in helpers!

    // with promise:
    let formData = req.body;
    productService.create(formData)
        .then(() => res.redirect("/products"))
        .catch(() => res.status(400));


    //with callback:
    // productService.create(formData, (err) => {
    //     if (err) {
    //         return res.status(400).end()
    //     }
    //     res.redirect("/products");
    // });

});

router.get("/details/:productId", async (req, res) => {
    const currentId = req.params.productId;
    // let currentCube = await productService.getOne(currentId);
    let currentCube = await productService.getOneWithAccessories(currentId);
    console.log("=================================================================");
    console.log(currentCube);

    res.render("details", { title: "Product Details", currentCube })
});


router.get("/:productId/attach", async (req, res) => {
    const currentId = req.params.productId;
    let currentCube = await productService.getOne(currentId);
    let accessories = await accessoryService.getAll();
    res.render("attachAccessory", { currentCube, accessories });

});

router.post("/:productId/attach", (req, res) => {
    productService.attachAccessory(req.params.productId, req.body.accessory)
        .then(() => res.redirect(`/products/details/${req.params.productId}`))

});



module.exports = router


