const router = require('express').Router()
const Match = require('../models/match')
const Player = require('../models/player')

router.route('/').get(async (req,res,next)=>{
    try {
        const matches = await Match.find({})
        res.send(matches)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.route('/start').post(async (req,res,next)=>{
    const match = new Match({
        matchName: 'TEST MATCH',
        radPlayer1: req.body.radPlayers[0].id,
        radPlayer2: req.body.radPlayers[1].id,
        radPlayer3: req.body.radPlayers[2].id,
        radPlayer4: req.body.radPlayers[3].id,
        radPlayer5: req.body.radPlayers[4].id,
        direPlayer1: req.body.direPlayers[0].id,
        direPlayer2: req.body.direPlayers[1].id,
        direPlayer3: req.body.direPlayers[2].id,
        direPlayer4: req.body.direPlayers[3].id,
        direPlayer5: req.body.direPlayers[4].id,
        status: 'STARTED'
    })
    try {
      await match.save();
      res.status(201).send(match)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.route('/:id/radVictory').patch(async (req,res,next)=>{
    try {
        let match = await Match.findById(req.params.id)
        if (match.status === 'STARTED'){
            match = await Match.findByIdAndUpdate(match, {$set:{status: 'RADIANTVICTORY'}}, {new: true, runValidators: true})
            // Update winners
            await Player.findByIdAndUpdate({ $in: [
                match.radPlayer1,
                match.radPlayer2,
                match.radPlayer3,
                match.radPlayer4,
                match.radPlayer5
            ] } , {$inc : {'wins' : 1, 'games':1}});
            
            // Update losers
            await Player.findByIdAndUpdate( { $in: [
                match.direPlayer1,
                match.direPlayer2,
                match.direPlayer3,
                match.direPlayer4,
                match.direPlayer5
            ]  }, {$inc : {'games' : 1}});
        }
        res.send(match)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.route('/:id/direVictory').patch(async (req,res,next)=>{
    try {
        let match = await Match.findById(req.params.id)

        if (match.status === 'STARTED'){
            match = await Match.findByIdAndUpdate(req.params.id, {$set:{status: 'DIREVICTORY'}}, {new: true, runValidators: true})
            
            // Update winners
            await Player.findByIdAndUpdate ( 
                { $in: [
                    match.direPlayer1,
                    match.direPlayer2,
                    match.direPlayer3,
                    match.direPlayer4,
                    match.direPlayer5
                ] } 
            , {$inc : {'wins' : 1, 'games':1}});
            
            // Update losers
            await Player.findByIdAndUpdate (
                { $in: [
                    match.radPlayer1,
                    match.radPlayer2,
                    match.radPlayer3,
                    match.radPlayer4,
                    match.radPlayer5
                ] }
             , {$inc : {'games' : 1}});
        }
        res.send(match)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router