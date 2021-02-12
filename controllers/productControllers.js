const { Router } = require("express");
const productService = require("../services/productService");
const accessoryService = require("../services/accessoryService");
const { validateInputs } = require("./helpers/helpers");

//middlewars:
const isAuthenticated = require("../middlewares/isAuthenticated");
const isGuest = require("../middlewares/isGuest");

const router = Router();


router.get("/", (req, res) => {
    let queries = req.query;
    productService.getAll(queries)
        .then((products) => {
            // console.log(products);
            res.render("home", { title: "Browse", products });
        })
        .catch(() => res.status(400))

});

router.get("/create", isAuthenticated, (req, res) => {
    res.render("create", { title: "Create" });

});

router.post("/create", isAuthenticated, validateInputs, (req, res) => {
    // TODO: Validate inputs later! => done with middleware in helpers!

    // with promise:
    let formData = req.body;
    productService.create(formData, req.user._id)
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
    // console.log("=================================================================");
    // console.log(currentCube);

    res.render("details", { title: "Product Details", currentCube })
});


router.get("/:productId/attach", isAuthenticated, async (req, res) => {
    const currentId = req.params.productId;
    let currentCube = await productService.getOne(currentId);
    // let accessories = await accessoryService.getAll();
    let accessories = await accessoryService.getAllNotAttached(currentCube.accessories);
    res.render("attachAccessory", { currentCube, accessories });

});

router.post("/:productId/attach", isAuthenticated, (req, res) => {
    productService.attachAccessory(req.params.productId, req.body.accessory)
        .then(() => res.redirect(`/products/details/${req.params.productId}`))

});

router.get("/:productId/edit", isAuthenticated, async (req, res) => {
    const currentId = req.params.productId;
    let currentCube = await productService.getOne(currentId);
    let accessories = await accessoryService.getAllNotAttached(currentCube.accessories);
    res.render("editCubePage", { currentCube, accessories })
});

router.get("/:productId/delete", isAuthenticated, async (req, res) => {
    const currentId = req.params.productId;
    let currentCube = await productService.getOne(currentId);
    let accessories = await accessoryService.getAllNotAttached(currentCube.accessories);
    res.render("deleteCubePage", { currentCube, accessories })
});

router.post("/:productId/edit", isAuthenticated, validateInputs, (req, res) => {
    let formData = req.body;
    let id = req.params.productId

    productService.updateOne(id, formData)
        .then(() => res.redirect(`/products/details/${id}`))
        .catch(() => res.status(400));
});

router.post("/:productId/delete", isAuthenticated, (req, res) => {
    let id = req.params.productId
    productService.getOne(id)
        .then(cube => {
            if (cube.creator != req.user._id) {
                console.log(cube.creator != req.user._id);
                console.log(typeof(cube.creator));                
                console.log(typeof(req.user._id));                
                return res.redirect("/products");
            }
            return productService.deleteOne(id);
        })
        .then(() => res.redirect(`/products`))
        .catch(() => res.status(400));
});



module.exports = router


