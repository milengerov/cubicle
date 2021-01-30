const fs = require("fs").promises;
const path = require("path");
let products = require("../config/products.json");

function create(product) {

    products.push(product);
    
    // fs.writeFile(path.resolve("./config/products.json"), JSON.stringify(products), callback());
    return fs.writeFile(path.resolve("./config/products.json"), JSON.stringify(products)); 
}

function getAll(){
    return products;
}

function getOne(id){
    return products.find(x => x.id === id);

}

module.exports = {
    create,
    getAll,
    getOne
}