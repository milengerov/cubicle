const Cube = require("../models/Cube");
const uniqid = require("uniqid")
const fs = require("fs");
const path = require("path")

let products = require("../config/products.json")


function getAll(){
    // fs.readFile("../config/products.json", (err, data) => {
    // })

    return products
}


function create(formData) {
    
    let cube = new Cube(
        uniqid(), 
        formData.name, 
        formData.description, 
        formData.imageUrl, 
        formData.difficultyLevel);

    let products = getAll();
    products.push(cube);

    fs.writeFile(path.resolve("./config/products.json"), JSON.stringify(products), (err) => {
         if (err) {
             throw err;
         }
         
    })

}

module.exports = {
    create,
}