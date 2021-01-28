const { Router } = require("express");
const productService = require("../services/productService")

const router = Router();


router.get("/", (req, res)  => {
    let products = productService.getAll();
    res.render("home", {title: "Browse", products});

});

router.get("/create", (req, res) => {
    res.render("create", {title: "Create"});
    
});

router.post("/create", (req, res) => {
    // console.log(req.body);
    
    // TODO: Validate inputs later!
    

    let formData = req.body;
    productService.create(formData);
    res.redirect("/products");

    
})

router.get("/details/:productId", (rec, res) => {
    res.render("details", {title: "Product Details"})
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