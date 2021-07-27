const router = require('express').Router()
const { findById } = require('../models/match')
const Match = require('../models/match')
const Player = require('../models/player')

router.route('/').get(async (req, res, next) => {
    try {
        const matches = await Match.find({})
        res.send(matches)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.route('/start').post(async (req, res, next) => {
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

router.route('/:id/radVictory').patch(async (req, res, next) => {
    try {

        const match = await Match.findById(req.params.id);
        
        if(match.status==='STARTED'){
            const winners = await Player.find({
                '_id': {
                    $in: [
                        match.radPlayer1,
                        match.radPlayer2,
                        match.radPlayer3,
                        match.radPlayer4,
                        match.radPlayer5
                    ]
                }
            })
            for (const winner of winners){
                winner.wins+=1
                winner.games+=1
                await winner.save()
            }
    
            const losers = await Player.find({
                '_id': {
                    $in: [
                        match.direPlayer1,
                        match.direPlayer2,
                        match.direPlayer3,
                        match.direPlayer4,
                        match.direPlayer5
                    ]
                }
            })
            for (const loser of losers){
                loser.games+=1
                await loser.save()
            }
            match.status='RADIANTVICTORY';
            await match.save()
            return res.status(201).send({
                msg:'Points Added Succesfully'
            })
            
        }

        return res.status(404).json({
            errMsg: 'Match not found'
        })

        


    } catch (e) {
        res.status(500).send(e)
    }
})

router.route('/:id/direVictory').patch(async (req, res, next) => {
    try {

        const match = await Match.findById(req.params.id);
        
        if(match.status==='STARTED'){
            const winners = await Player.find({
                '_id': {
                    $in: [
                        match.direPlayer1,
                        match.direPlayer2,
                        match.direPlayer3,
                        match.direPlayer4,
                        match.direPlayer5
                    ]
                }
            })
            for (const winner of winners){
                winner.wins+=1
                winner.games+=1
                await winner.save()
            }
    
            const losers = await Player.find({
                '_id': {
                    $in: [
                        match.radPlayer1,
                        match.radPlayer2,
                        match.radPlayer3,
                        match.radPlayer4,
                        match.radPlayer5
                    ]
                }
            })
            for (const loser of losers){
                loser.games+=1
                await loser.save()
            }
            match.status='DIREVICTORY';
            await match.save()
            
            return res.status(201).send({
                msg:'Points Added Succesfully'
            })
            
        }

        return res.status(404).json({
            errMsg: 'Match not found'
        })

        


    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router