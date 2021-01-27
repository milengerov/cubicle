const express = require("express");
const config = require("./config/config");
const expressConfig = require("./config/express")

const routes = require("./routes")


const app = express();

expressConfig(app);
app.use(routes);

// app.get("/", (req, res) => {
//     res.render("home", {layout: false});
// })



app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`));
