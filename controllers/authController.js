// const { Router } = require("express");
// const router = Router();
const router = require("express").Router();

const authService = require("../services/authService");
const config = require("../config/config")

//middlewars:
const isAuthenticated = require("../middlewares/isAuthenticated");
const isGuest = require("../middlewares/isGuest");




router.get("/login", isGuest, (req, res) => {
    res.render("login", { title: "Login Page" });

});

router.get("/register", isGuest, (req, res) => {
    res.render("register", { title: "Register" });

});

router.post("/login", isGuest, async (req, res) => {
    const { username, password } = req.body;

    try {
        let token = await authService.login({ username, password });        
        res.cookie(config.COOKIE_NAME, token);      //COOCKIE_NAME: userData;

        res.redirect("/products");

    }
    catch (error) {
        console.log(error);
        res.render("login", { error });
    }

    
});



router.post("/register", isGuest, async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        res.render("register", { error });
        return;
    }

    try {
        let user = await authService.register(username, password);

        res.redirect("/auth/login");
    }
    catch (error) {
        res.render("register", { error });
    }

});

router.get("/logout", isAuthenticated,(req, res) => {
    console.log("logout");
    res.clearCookie(config.COOKIE_NAME);
    res.redirect("/products");
})



module.exports = router;