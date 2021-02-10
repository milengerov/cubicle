// const { Router } = require("express");
// const router = Router();
const router = require("express").Router();

const authService = require("../services/authService");
const config = require("../config/config")


router.get("/login", (req, res) => {
    res.render("login", { title: "Login Page" });

});

router.get("/register", (req, res) => {
    res.render("register", { title: "Register" });

});

router.post("/login", async (req, res) => {
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



router.post("/register", async (req, res) => {
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



module.exports = router;