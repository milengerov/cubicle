const fs = require("fs").promises;
const path = require("path");
let products = require("../config/products.json");


class Model{

    save() {
        products.push(this);    
        // fs.writeFile(path.resolve("./config/products.json"), JSON.stringify(products), callback());
        return fs.writeFile(path.resolve("./config/products.json"), JSON.stringify(products));
    }

    static getAll() {
        return products;
    }

    static getOne(id) {
        return products.find(x => x.id === id);
    }

}

module.exports = Model;