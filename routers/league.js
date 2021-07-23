const express = require('express')
const router = new express.Router()

const Player = require('../models/player')

router.get('/league', async (req, res) =>{
    try{
        const friends = await Friend.find({})
        res.send(friends)
    }catch(e){
        res.status(500).send(e)
    }
})