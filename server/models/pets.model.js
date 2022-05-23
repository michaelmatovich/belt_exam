const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required!"],
        minlength: [3, "Name must be at least 3 characters!"]
    },
    type: {
        type: String,
        required: [true, "Type is required!"],
        minlength: [3, "Type must be at least 3 characters!"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [3, "Description must be at least 3 characters"]
    },
    skill_one: {
        type: String
    },
    skill_two: {
        type: String
    },
    skill_three: {
        type: String
    }
},{timestamps: true})


const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;