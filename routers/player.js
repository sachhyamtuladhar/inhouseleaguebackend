const axios = require('axios');

const express = require('express')
const router = new express.Router()

const Player = require('../models/player')



router.get('/', async (req, res) => {
    try {
        const players = await Player.find({})
        const playersInfo = [];
        for (const player of players) {
            const { data } = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.STEAM_API_KEY}&format=json&steamids=${player.steamID}`);
            const output = data.response.players[0];
            const playerInfo = {
                status: output.personastate,
                id: player._id,
                name: output.personaname,
                image: output.avatar,
                wins: player.wins,
                games: player.games
            }
            playersInfo.push(playerInfo)
        }
        res.status(201).json({
            data: playersInfo,
            msg: 'Success retrieving players'
        })
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/sort/:order', async (req, res) => {
    try {

        let order = req.params.order
        const players = await Player.find({}).sort({wins:order})
        const playersInfo = [];
        for (const player of players) {
            const { data } = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.STEAM_API_KEY}&format=json&steamids=${player.steamID}`);
            const output = data.response.players[0];
            const playerInfo = {
                status: output.personastate,
                id: player._id,
                name: output.personaname,
                image: output.avatar,
                wins: player.wins,
                games: player.games
            }
            playersInfo.push(playerInfo)
        }
        res.status(201).json({
            data: playersInfo,
            msg: 'Success retrieving players'
        })
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const player = await Player.findById(_id)
        if (!player)
            res.status(404).send()
        res.send(player)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/', async (req, res) => {

    const { steamID } = req.body;

    var SteamID = require('steamid');
    var sid = SteamID.fromIndividualAccountID(steamID);
    if(!sid){
        return res.status(401).json({
            msg:'Wrong id input'
        })
    }

    const player = new Player({
        steamID: sid.getSteamID64(),
        wins: 0,
        games: 0
    })
    try {
        await player.save()
        res.status(201).json({
            data: player,
            msg: 'Successfully Added'
        })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})


router.delete('/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const player = await Player.findByIdAndDelete(_id);
        if (!player) return res.sendStatus(404);
        return res.send(player);
    } catch (e) {
        return res.sendStatus(400).send(e);
    }

})

router.patch('/:id', async (req, res) => {
    const allowedUpdates = ['nickname']
    updatesValid = updates.every(update=>allowedUpdates.includes(update))
    if(!updatesValid)
        res.status(400).send('Error: Invalid Updates! You can only upodate nickname!')

    try {
        const _id = req.params.id
        const match = await Match.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        if(!match)
            res.status(404).send()
        res.send(match)
      
    }catch(e){
        res.status(400).send(e)
    }
})

router.patch('/:id/radvictory', async (req, res) => {
    const _id = req.params.id
    try {
        const match = await Match.findById(_id, {status:'RADIANTVICTORY'}, {new: true, runValidators: true})
        if(!match)
            res.status(404).send()
        res.send(match)
      
    }catch(e){
        res.status(400).send(e)
    }
})

router.patch('/:id/direvictory', async (req, res) => {
    const _id = req.params.id
    try {
        const match = await Match.findById(_id, {status:'DIREVICTORY'}, {new: true, runValidators: true})
        if(!match)
            res.status(404).send()
        res.send(match)
      
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router;