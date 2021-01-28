const { Router } = require("express");
const router = Router();


router.get("/about", (req, res)  => {
    res.render("about", {title: "About Page"});

});

router.get("/", (req, res)  => {
    // res.render("home", {title: "Browse"});
    res.redirect("/products")

});



module.exports = router