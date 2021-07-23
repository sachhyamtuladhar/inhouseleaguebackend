const express = require('express')
const router = new express.Router()

const Player = require('../models/player')

router.get('/players', async (req, res) =>{
    try{
        const players = await Player.find({})
        res.send(players)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/players/:id', async(req, res)=>{
    const _id = req.params.id
    try{
        const player = await Player.findById(_id)
        if(!player)
            res.status(404).send()
        res.send(player)
    }catch(e){
        res.status(500).send(e)
    }
})

router.post('/players', async(req,res)=>{
    console.log(req.body)
    const player = new Player(req.body)
    try{
        await player.save()
        res.status(201).send(player)
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})


router.delete('/players/:id',async (req,res)=>{
    const _id = req.params.id
    try {
        const player = await Player.findByIdAndDelete(_id);
        if (!player) return res.sendStatus(404);
        return res.send(player);
    } catch (e) {
        return res.sendStatus(400).send(e);
    }

})
