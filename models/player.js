const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    nickname:{
        type: String,
        trim: true,
        required: true
    },
    steamID:{
        type: String,
        trim: true,
        required: true
    }
})

module.exports =  mongoose.model('Player', playerSchema)
