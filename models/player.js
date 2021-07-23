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
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports =  mongoose.model('Player', playerSchema)
