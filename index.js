const path = require('path')
const express = require('express')
const dotenv = require('dotenv');
require('dotenv').config()

dotenv.config({
    path: path.join(__dirname,'/config/config.env') 
})

require('./db/mongoose');



const Match = require('./models/match');
const Player = require('./models/player');

const playerRouter = require('./routers/player');
const matchRouter = require('./routers/match');

const app = express();



app.use(express.json());

app.use(playerRouter)
app.use(matchRouter)

app.use((req, res) => {
    res.render('404', {
        path: req.url
    })
})

app.use((error,req,res,next)=>{
    res.status(400).render('error',{
        msg: error
    })
})


const port = process.env.PORT || 3000;

app.listen(port,function(err,done){
    if(err){
        console.log(err)
    }else{
        console.log("server is up on port", port); 
    }
})