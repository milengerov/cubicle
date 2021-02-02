const Cube = require("../models/Cube");
// const uniqid = require("uniqid")

const productData = require("../data/productData")





async function getAll(queries) {
    // let products = productData.getAll();
    // let products = Cube.getAll()
    let products = await Cube.find({}).lean();
    console.log(queries);


    if (queries.search) {
        products = products.filter(cube => cube.name.toLowerCase().includes(queries.search.toLowerCase()));
    }

    if (queries.from) {
        products = products.filter(cube => Number(cube.difficultyLevel) >= queries.from)
    }

    if (queries.to) {
        products = products.filter(cube => Number(cube.difficultyLevel) <= queries.to)
    }
    

    return products;
}

async function getOne(id) {
    // return products.find(x => x.id === id);
    // return productData.getOne(id);
    // return Cube.getOne(id);
    return await Cube.findById(id).lean();
}


function create(formData, callback) {       //create is async func, that's why with callback - old way


    let cube =new Cube(formData);
    return cube.save();


    // let cube = new Cube(
    //     uniqid(),
    //     formData.name,
    //     formData.description,
    //     formData.imageUrl,
    //     formData.difficultyLevel);

    // return productData.create(cube);
    // return cube.save();



}

module.exports = {
    create,
    getAll,
    getOne,
}