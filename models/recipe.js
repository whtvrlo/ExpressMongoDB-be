const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    description: {
        type: String,
        required: true

    },
    postedDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('recipes', recipeSchema); //takes 2 parameters: name of database, and schema that corresponds to that model

