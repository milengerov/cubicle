const Cube = require("../models/Cube");
const uniqid = require("uniqid")
const fs = require("fs").promises;
const path = require("path")

let products = require("../config/products.json");
const x = require("uniqid");
const { query } = require("express");


function getAll(queries) {
    let result = products;
    console.log(queries);
    console.log(result);

    if (queries.search) {
        result = result.filter(cube => cube.name.toLowerCase().includes(queries.search.toLowerCase()));
    }

    if (queries.from) {
        result = result.filter(cube => Number(cube.difficultyLevel) >= queries.from)
    }

    if (queries.to) {
        result = result.filter(cube => Number(cube.difficultyLevel) <= queries.to)
    }
    console.log(result);

    return result;
}

function getOne(id) {
    return products.find(x => x.id === id);
}


function create(formData, callback) {       //create is async func, that's why with callback - old way

    let cube = new Cube(
        uniqid(),
        formData.name,
        formData.description,
        formData.imageUrl,
        formData.difficultyLevel);

    let products = getAll();
    products.push(cube);

    // fs.writeFile(path.resolve("./config/products.json"), JSON.stringify(products), callback());
    return fs.writeFile(path.resolve("./config/products.json"), JSON.stringify(products)); 

}

module.exports = {
    create,
    getAll,
    getOne,
}