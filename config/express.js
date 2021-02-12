const express = require("express");
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser")

const auth = require("../middlewares/auth");


function setUpExpress(app) {

    app.engine("hbs", handlebars({
        extname: "hbs",
    }));
    
    app.set("view engine", "hbs");
    
    app.use(express.static("static"));

    app.use(express.urlencoded({    // set body parser to get form data in req.
        extended: true 
    }));

    app.use(cookieParser());

    app.use(auth());



    
}


module.exports = setUpExpress;


