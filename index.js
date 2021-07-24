const path = require('path')
const express = require('express')
const dotenv = require('dotenv');
require('dotenv').config()

dotenv.config({
    path: path.join(__dirname,'/config/config.env') 
})

require('./db/mongoose');

const cors = require('cors')

const playerRouter = require('./routers/player');
const matchRouter = require('./routers/match');

const app = express();

app.use(cors())



app.use(express.json());

app.use('/players', playerRouter)
app.use('/matches', matchRouter)

app.use((req, res) => {
    res.status(404).send()
})


const port = process.env.PORT || 3006;

app.listen(port,function(err,done){
    if(err){
        console.log(err)
    }else{
        console.log("server is up on port", port); 
    }
})