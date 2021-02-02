const fs = require("fs").promises;
const path = require("path");
let products = require("../config/products.json");
const Model = require("./Model")


class Cube extends Model{
    constructor(id, name, description, imageUrl, difficultyLevel) {
        
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.difficultyLevel = difficultyLevel;
    }
 
}


module.exports = Cube;