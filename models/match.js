const mongoose = require('mongoose')

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
    direPlayer1:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    direPlayer2:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    direPlayer3:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    direPlayer4:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    direPlayer5:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    status:{
        type: String,
        enum : ['UNKNOWN', 'STARTED', 'RADIANTVICTORY', 'DIREVICTORY'],
        default: 'UNKNOWN'
    }
})

module.exports =  mongoose.model('Match', matchSchema)
