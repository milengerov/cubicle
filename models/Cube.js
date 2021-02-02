
const Model = require("./Model")
const mongoose = require("mongoose")

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        reqired: true,
    },
    description: {
        type:String,
        reqired: true,
        maxlength: 50,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: /^https?/
    },
    difficultyLevel: {
        type:Number,
        min: 1,
        max: 6,
    },
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: "Accessory",
    }]
});
 
// class Cube extends Model{
//     constructor(id, name, description, imageUrl, difficultyLevel) {
        
//         this.id = id;
//         this.name = name;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this.difficultyLevel = difficultyLevel;
//     }
 
// }


// module.exports = Cube;
module.exports = mongoose.model("Cube", cubeSchema);