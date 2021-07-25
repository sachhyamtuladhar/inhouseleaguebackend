const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const playerSchema = new mongoose.Schema({
    nickname:{
        type: String,
        trim: true
    },
    steamID:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    wins:{
        type: Number,
        default: 0
    }, 
    games:{
        type: Number,
        default: 0
    }
})

playerSchema.plugin(uniqueValidator);
module.exports =  mongoose.model('Player', playerSchema)
