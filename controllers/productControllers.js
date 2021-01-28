const { Router } = require("express");
const router = Router();



router.get("/", (req, res)  => {
    res.render("home", {title: "Browse"});

});

router.get("/create", (req, res) => {
    res.render("create", {title: "Create"});
    
});

router.post("/create", (req, res) => {
    console.log(req.body);
    res.send("created")
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