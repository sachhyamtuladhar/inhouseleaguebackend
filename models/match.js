const mongoose = require('mongoose')
const validator = require('validator')

const matchSchema = new mongoose.Schema({
    matchName:{
        type: String,
        trim: true,
        required: true
    },
    dotaMatchId:{
        type: String,
        trim: true,
        required: false
    },
    radPlayer1:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    radPlayer2:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    radPlayer3:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    radPlayer4:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    radPlayer5:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    direlayer1:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    direlayer2:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    direlayer3:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    direlayer4:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    direlayer5:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    }
})

module.exports =  mongoose.model('Match', matchSchema)
