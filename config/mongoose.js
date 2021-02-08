
const mongoose = require("mongoose");
const config = require("./config")



module.exports = (app) => {
    //first connenct mongoose with db named cubicles:
    mongoose.connect(config.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const db = mongoose.connection;
    db.on("error", (err) => console.error(`Conection Error: ${err}`));
    db.once("open", () => console.log("Connected to db"));
}