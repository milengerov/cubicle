const mongoose = require("mongoose")

const accessorySchema = new mongoose.Schema({
    id: {
        type: mongoose.Types.ObjectId
    },
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
    
    
});

module.exports = mongoose.model("Accesory", accessorySchema);