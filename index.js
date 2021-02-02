const express = require("express");
const config = require("./config/config");
const expressConfig = require("./config/express")
// const mongooseConfig = require("./config/mongoose");

const routes = require("./routes")


const app = express();

expressConfig(app);

// mongooseConfig(app);
require("./config/mongoose")(app);  //insted of keep it in const.

app.use(routes);

// app.get("/", (req, res) => {
//     res.render("home", {layout: false});
// })



app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`));
