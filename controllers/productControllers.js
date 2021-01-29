const { Router } = require("express");
const productService = require("../services/productService")
const { validateInputs } = require("./helpers/helpers")

const router = Router();


router.get("/", (req, res) => {
    let queries = req.query;
    let products = productService.getAll(queries);
    res.render("home", { title: "Browse", products });

});

router.get("/create", (req, res) => {
    res.render("create", { title: "Create" });

});

router.post("/create", validateInputs, (req, res) => {
    // console.log(req.body);

    // TODO: Validate inputs later! => done with middleware in helpers!


    let formData = req.body;
    //with callback:
    // productService.create(formData, (err) => {
    //     if (err) {
    //         return res.status(400).end()
    //     }
    //     res.redirect("/products");
    // });

    // with promise:
    productService.create(formData)
        .then(() => res.redirect("/products"))
        .catch(() => res.status(400))


})

router.get("/details/:productId", (req, res) => {
    const currentId = req.params.productId;
    const currentCube = productService.getOne(currentId);
    res.render("details", { title: "Product Details", currentCube })
})



module.exports = router


// const productControlers = {
//     index(req, res) {
//         res.render("home", {layout = false});
//     },
//     create(req, res) {
//         res.render("create", {layout = false});
//     },
// }

// module.exports = productControlers;



// with func:
// function index(req, res) {
//     res.render("home", { layout = false });
// }

// router.get("/", index);


//directly pass arrow func as second arg